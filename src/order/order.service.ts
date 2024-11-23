import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismService: PrismaService) {}

  // findOrderByUserId(userId: string) {
  //   return this.prismService.order.findFirst({
  //     where: {
  //       userId,
  //     },
  //   });
  // }

  createOrder(userId: string, cartTotal: number) {
    return this.prismService.order.create({
      data: {
        userId,
        cartTotal,
      },
    });
  }

  findOrderByUserId(userId: string) {
    return this.prismService.order.findMany({
      where: {
        userId,
      },
      include: {
        productOnOrder: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  updateOrder(orderId: string, data: { cartTotal: number }) {
    return this.prismService.order.update({
      where: {
        id: orderId,
      },
      data,
    });
  }

  createAllOrderOnOrder(
    orderId: string,
    productOnCarts: {
      productId: string;
      count: number;
      price: number;
    }[],
  ) {
    return this.prismService.productOnOrder.createMany({
      data: productOnCarts.map((productOnCart) => ({
        productId: productOnCart.productId,
        count: productOnCart.count,
        price: productOnCart.price,
        orderId,
      })),
    });
  }

  updateSoldOnProduct(productOnCarts: { productId: string; count: number }) {
    return this.prismService.product.update({
      where: {
        id: productOnCarts.productId,
      },
      data: {
        sold: {
          increment: productOnCarts.count,
        },
      },
    });
  }
}
