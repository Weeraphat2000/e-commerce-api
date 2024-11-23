import {
  Controller,
  Get,
  Post,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decoratos';
import { Role } from 'src/model/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomRequest } from 'src/config/req';
import { CartService } from 'src/cart/cart.service';

@Auth(Role.USER)
@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create order (user)',
    description: 'Create order from cart and user only',
  })
  async createOrder(@Req() req: CustomRequest) {
    const hasCart = await this.cartService.findCartByUserId(req.user.id);
    if (!hasCart) {
      throw new BadRequestException('Cart is empty');
    }

    for (const productOnCart of hasCart.productOnCarts) {
      const product = await this.cartService.findProduct(
        productOnCart.productId,
      );
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      if (product.quantity < productOnCart.count + product.sold) {
        throw new BadRequestException(
          `Product '${product.title}' is out of stock`,
        );
      }
    }

    const order = await this.orderService.createOrder(
      req.user.id,
      hasCart.cartTotal,
    );

    await this.orderService.createAllOrderOnOrder(
      order.id,
      hasCart.productOnCarts.map((productOnCart) => ({
        productId: productOnCart.productId,
        count: productOnCart.count,
        price: productOnCart.price,
      })),
    );

    for (const productOnCart of hasCart.productOnCarts) {
      await this.orderService.updateSoldOnProduct({
        productId: productOnCart.productId,
        count: productOnCart.count,
      });
    }

    await this.cartService.removeAllProductOnCart(hasCart.id);
    await this.cartService.removeCart(hasCart.id);

    return this.orderService.findOrderByUserId(req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all order (user)',
    description: 'Find all order by user id and user only',
  })
  findAllOrder(@Req() req: CustomRequest) {
    return this.orderService.findOrderByUserId(req.user.id);
  }
}
