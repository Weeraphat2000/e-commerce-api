import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/config/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/config/jwt.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    AuthService,
    JwtService,
    CartService,
  ],
})
export class OrderModule {}
