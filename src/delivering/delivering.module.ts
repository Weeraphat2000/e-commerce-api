import { Module } from '@nestjs/common';
import { DeliveringService } from './delivering.service';
import { DeliveringController } from './delivering.controller';
import { PrismaService } from 'src/config/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/config/jwt.service';

@Module({
  controllers: [DeliveringController],
  providers: [DeliveringService, PrismaService, AuthService, JwtService],
})
export class DeliveringModule {}
