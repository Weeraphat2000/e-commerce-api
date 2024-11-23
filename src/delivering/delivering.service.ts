import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class DeliveringService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOrderByOrderId(id: string) {
    return this.prismaService.order.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: string, orderStatus: string) {
    return this.prismaService.order.update({
      where: { id },
      data: {
        orderStatus,
      },
    });
  }

  findAll() {
    return this.prismaService.order.findMany({
      include: {
        productOnOrder: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            address: true,
            enabled: true,
          },
        },
      },
    });
  }
}
