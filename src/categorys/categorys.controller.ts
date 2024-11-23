import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decoratos';
import { Role } from 'src/model/role.enum';

@Controller('categorys')
@ApiTags('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Create category (admin)',
    description: 'Create category',
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.create(createCategoryDto);
  }

  @Auth()
  @ApiOperation({
    summary: 'Find all category',
    description: 'Find all category',
  })
  @Get()
  findAll() {
    return this.categorysService.findAll();
  }

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Remove one category (admin)',
    description: 'Remove one category by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categorysService.removeCategory(id);
    return this.categorysService.remove(id);
  }
}
