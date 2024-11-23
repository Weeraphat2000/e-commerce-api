import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaService } from 'src/config/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/config/jwt.service';

import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [ImageController],
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [ImageService, PrismaService, AuthService, JwtService],
})
export class ImageModule {}
