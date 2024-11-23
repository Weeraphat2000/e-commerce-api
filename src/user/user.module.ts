import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from 'src/config/jwt.service';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, JwtService],
})
export class UserModule {}
