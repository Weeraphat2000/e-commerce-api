import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/config/prisma.service';
import { BcryptService } from 'src/config/bcrypt.service';
import { JwtService } from 'src/config/jwt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, BcryptService, JwtService],
})
export class AuthModule {}
