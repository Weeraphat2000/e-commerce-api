import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  NotFoundException,
  // UploadedFiles,
  // UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, QueryProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decoratos';
import { Role } from 'src/model/role.enum';
// import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Create product (admin)',
    description: 'Create product',
  })
  @Post()
  // @UseInterceptors(FilesInterceptor('file'))
  async create(
    @Body() createProductDto: CreateProductDto,
    // @UploadedFiles() file: Express.Multer.File,
  ) {
    const { images, category, ...res } = createProductDto;

    for (const i of category) {
      const hasCategory = await this.productService.findCategory(i);
      if (!hasCategory) {
        throw new BadRequestException('Category not found');
      }
    }

    const product = await this.productService.create(res);

    for (const c of category) {
      await this.productService.createCategory(product.id, c);
    }
    const newImages = images.map((image) => ({
      ...image,
      productId: product.id,
    }));

    for (const image of newImages) {
      await this.productService.createImages(image);
    }

    return this.productService.findById(product.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all product',
    description: 'Find all product',
  })
  async findAll(
    @Query()
    query: QueryProductDto,
  ) {
    const { sort, category, limit, offset, search, priceMax, priceMin } = query;

    if (category && category.startsWith('category:')) {
      const categorysId = category.split(':')[1].split(',');

      for (const c of categorysId) {
        const hasCategory = await this.productService.findCategory(c);
        if (!hasCategory) {
          throw new BadRequestException('Category not found');
        }
      }
    }

    if (sort && sort.startsWith('orderBy:') && sort.includes('=')) {
      const [key, order] = sort.split(':')[1].split('=');

      if (
        key !== 'createdAt' &&
        key !== 'updatedAt' &&
        key !== 'price' &&
        key !== 'title'
      ) {
        throw new BadRequestException('Invalid sort key');
      }
      if (order !== 'asc' && order !== 'desc') {
        throw new BadRequestException('Invalid sort order');
      }
    }

    if ((limit && isNaN(+limit)) || (offset && isNaN(+offset))) {
      throw new BadRequestException('Invalid limit or offset');
    }

    if ((priceMax && isNaN(+priceMax)) || (priceMin && isNaN(+priceMin))) {
      throw new BadRequestException('Invalid price min or max');
    }

    if (+priceMax < +priceMin || +priceMin < 0 || +priceMax < 0) {
      throw new BadRequestException('Invalid price min or max');
    }

    if (priceMax && sort && category) {
      const [sortKey, sortOrder] = sort.split(':')[1].split('=');
      const categorysId = category.split(':')[1].split(',');
      return this.productService.searchLimitOffsetPriceCategorySort(
        search || '',
        +limit || 10,
        +offset || 0,
        +priceMin || 0,
        +priceMax,
        categorysId,
        sortKey,
        sortOrder,
      );
    }

    if (priceMax && category) {
      const categorysId = category.split(':')[1].split(',');
      return this.productService.searchLimitOffsetPriceCategory(
        search || '',
        +limit || 10,
        +offset || 0,
        +priceMin || 0,
        +priceMax,
        categorysId,
      );
    }

    if (priceMax && sort) {
      const [sortKey, sortOrder] = sort.split(':')[1].split('=');
      return this.productService.searchLimitOffsetPriceSort(
        search || '',
        +limit || 10,
        +offset || 0,
        +priceMin || 0,
        +priceMax,
        sortKey,
        sortOrder,
      );
    }

    if (category && sort) {
      const [sortKey, sortOrder] = sort.split(':')[1].split('=');
      const categorysId = category.split(':')[1].split(',');
      return this.productService.searchLimitOffsetCategorySort(
        search || '',
        +limit || 10,
        +offset || 0,
        categorysId,
        sortKey,
        sortOrder,
      );
    }

    if (priceMax) {
      return this.productService.searchLimitOffsetPrice(
        search || '',
        +limit || 10,
        +offset || 0,
        +priceMin || 0,
        +priceMax,
      );
    }

    if (category) {
      const categorysId = category.split(':')[1].split(',');
      return this.productService.searchLimitOffsetCategory(
        search || '',
        +limit || 10,
        +offset || 0,
        categorysId,
      );
    }

    if (sort) {
      console.log('sort');
      const [sortKey, sortOrder] = sort.split(':')[1].split('=');
      return this.productService.searchLimitOffsetSort(
        search || '',
        +limit || 10,
        +offset || 0,
        sortKey,
        sortOrder,
      );
    }
    if (search) {
      return this.productService.searchLimitOffset(
        search || '',
        +limit || 10,
        +offset || 0,
      );
    }

    if (limit && offset) {
      return this.productService.limitOffset(+limit, +offset);
    }

    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find one product',
    description: 'Find one product by id',
  })
  async findOne(@Param('id') id: string) {
    const hasProduct = await this.productService.findById(id);
    if (!hasProduct) {
      throw new NotFoundException('Product not found');
    }
    return hasProduct;
  }

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Update product (admin)',
    description: 'Update product by id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { images, category, ...res } = updateProductDto;

    const hasProduct = await this.productService.findById(id);
    if (!hasProduct) {
      throw new NotFoundException('Product not found');
    }
    for (const i of category) {
      const hasCategory = await this.productService.findCategory(i);
      if (!hasCategory) {
        throw new BadRequestException('Category not found');
      }
    }

    await Promise.all([
      this.productService.removeCategory(id),
      this.productService.removeImages(id),
    ]);

    for (const c of category) {
      await this.productService.createCategory(id, c);
    }

    const newImages = images.map((image) => ({
      ...image,
      productId: id,
    }));

    for (const image of newImages) {
      await this.productService.createImages(image);
    }

    await this.productService.update(id, res);
    return this.productService.findById(id);
  }

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Remove one product (admin)',
    description: 'Remove one product by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const hasProduct = await this.productService.findById(id);
    if (!hasProduct) {
      throw new NotFoundException('Product not found');
    }

    await Promise.all([
      this.productService.removeCategory(id),
      this.productService.removeImages(id),
      this.productService.remove(id),
    ]);

    return { message: 'Product deleted successfully' };
  }
}
