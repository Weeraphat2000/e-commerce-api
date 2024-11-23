import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { PrismaService } from 'src/config/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/config/jwt.service';

@Module({
  controllers: [CategorysController],
  providers: [CategorysService, PrismaService, AuthService, JwtService],
})
export class CategorysModule {}
