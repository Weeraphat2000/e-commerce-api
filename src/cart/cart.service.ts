import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prismService: PrismaService) {}

  findCartByUserId(userId: string) {
    return this.prismService.cart.findFirst({
      where: {
        userId,
      },
      include: {
        productOnCarts: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  }

  findProduct(productId: string) {
    return this.prismService.product.findFirst({
      where: {
        id: productId,
      },
    });
  }

  createCart(userId: string, cartTotal: number) {
    return this.prismService.cart.create({
      data: {
        userId,
        cartTotal,
      },
    });
  }

  createProductOnCart(
    cartId: string,
    createCartDto: {
      productId: string;
      count: number;
      price: number;
    },
  ) {
    return this.prismService.productOnCart.create({
      data: {
        cartId,
        productId: createCartDto.productId,
        count: createCartDto.count,
        price: createCartDto.price,
      },
    });
  }

  updateProductOnCart(
    id: string,
    data: {
      count: number;
      price: number;
    },
  ) {
    return this.prismService.productOnCart.update({
      where: {
        id,
      },
      data: {
        count: data.count,
        price: data.price,
      },
    });
  }

  removeProductOnCart(id: string) {
    return this.prismService.productOnCart.delete({
      where: {
        id,
      },
    });
  }

  findAll(id: string) {
    return this.prismService.cart.findFirst({
      where: {
        userId: id,
      },
      include: {
        productOnCarts: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });
  }

  updateCart(id: string, cartTotal: number) {
    return this.prismService.cart.update({
      where: {
        id,
      },
      data: {
        cartTotal,
      },
    });
  }

  findProductOnCart(cartId: string, productId: string) {
    return this.prismService.productOnCart.findFirst({
      where: {
        cartId,
        productId,
      },
    });
  }

  //
  removeAllProductOnCart(id: string) {
    return this.prismService.productOnCart.deleteMany({
      where: {
        cartId: id,
      },
    });
  }

  removeCart(id: string) {
    return this.prismService.cart.delete({
      where: {
        id,
      },
    });
  }
}
