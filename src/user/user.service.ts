import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enabled: true,
        address: true,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
    });
  }

  changeStatus(UpdateUserDto: { id: string; enabled: boolean }) {
    return this.prismaService.user.update({
      where: {
        id: UpdateUserDto.id,
      },
      data: {
        enabled: UpdateUserDto.enabled,
      },
    });
  }

  changeRole(UpdateUserDto: { id: string; role: string }) {
    return this.prismaService.user.update({
      where: {
        id: UpdateUserDto.id,
      },
      data: {
        role: UpdateUserDto.role,
      },
    });
  }

  updateAddress(UpdateUserDto: { id: string; address: string }) {
    return this.prismaService.user.update({
      where: {
        id: UpdateUserDto.id,
      },
      data: {
        address: UpdateUserDto.address,
      },
    });
  }
}
