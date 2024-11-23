import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  create(createAuthDto: CreateAuthDto) {
    return this.prismaService.user.create({
      data: createAuthDto,
    });
  }
}
