import {
  Controller,
  Get,
  Body,
  Req,
  Patch,
  NotFoundException,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Auth } from 'src/auth/decorators/auth.decoratos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/config/req';
import { Role } from 'src/model/role.enum';

@Auth(Role.USER)
@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Patch('/add')
  @ApiOperation({
    summary: 'Add product to cart (user)',
    description: 'Add product to cart',
  })
  async create(
    @Body() createCartDto: CreateCartDto,
    @Req() req: CustomRequest,
  ) {
    const hasProduct = await this.cartService.findProduct(
      createCartDto.productId,
    );
    if (!hasProduct) {
      throw new NotFoundException('Product not found');
    }
    const hasCart = await this.cartService.findCartByUserId(req.user.id);
    if (!hasCart) {
      const cart = await this.cartService.createCart(
        req.user.id,
        hasProduct.price,
      );

      await this.cartService.createProductOnCart(cart.id, {
        productId: createCartDto.productId,
        count: 1,
        price: hasProduct.price,
      });

      return this.cartService.findAll(req.user.id);
    }

    const hasProductOnCart = await this.cartService.findProductOnCart(
      hasCart.id,
      createCartDto.productId,
    );

    if (!hasProductOnCart) {
      await this.cartService.createProductOnCart(hasCart.id, {
        productId: createCartDto.productId,
        count: 1,
        price: hasProduct.price,
      });
    } else {
      await this.cartService.updateProductOnCart(hasProductOnCart.id, {
        count: hasProductOnCart.count + 1,
        price: hasProduct.price + hasProductOnCart.price,
      });
    }

    await this.cartService.updateCart(
      hasCart.id,
      hasCart.cartTotal + hasProduct.price,
    );
    return this.cartService.findAll(req.user.id);
  }

  @Patch('/remove')
  @ApiOperation({
    summary: 'Remove product from cart (user)',
    description: 'Remove product from cart',
  })
  async remove(
    @Body() createCartDto: CreateCartDto,
    @Req() req: CustomRequest,
  ) {
    const hasProduct = await this.cartService.findProduct(
      createCartDto.productId,
    );
    if (!hasProduct) {
      throw new NotFoundException('Product not found');
    }
    const hasCart = await this.cartService.findCartByUserId(req.user.id);
    if (!hasCart) {
      throw new BadRequestException('Cannot remove product from empty cart');
    }

    const hasProductOnCart = await this.cartService.findProductOnCart(
      hasCart.id,
      createCartDto.productId,
    );

    if (!hasProductOnCart) {
      throw new NotFoundException('Product not found in cart');
    }

    if (hasProductOnCart.count === 1) {
      await this.cartService.removeProductOnCart(hasProductOnCart.id);
    } else {
      await this.cartService.updateProductOnCart(hasProductOnCart.id, {
        count: hasProductOnCart.count - 1,
        price: hasProductOnCart.price - hasProduct.price,
      });
    }

    await this.cartService.updateCart(
      hasCart.id,
      hasCart.cartTotal - hasProduct.price,
    );
    return this.cartService.findAll(req.user.id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Remove all product from cart (user)',
    description: 'Remove all product from cart',
  })
  async removeAll(@Req() req: CustomRequest) {
    const hasCart = await this.cartService.findCartByUserId(req.user.id);
    if (!hasCart) {
      throw new BadRequestException('Cannot remove product from empty cart');
    }

    await this.cartService.removeAllProductOnCart(hasCart.id);
    // await this.cartService.removeCart(hasCart.id);
    return this.cartService.findAll(req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all product in cart (user)',
    description: 'Find all product in cart',
  })
  findAll(@Req() req: CustomRequest) {
    return this.cartService.findAll(req.user.id);
  }
}
