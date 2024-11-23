import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/config/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/config/jwt.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, AuthService, JwtService],
})
export class ProductModule {}
