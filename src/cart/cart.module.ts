import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtService } from 'src/config/jwt.service';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, AuthService, JwtService],
})
export class CartModule {}
