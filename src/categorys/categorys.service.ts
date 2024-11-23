import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class CategorysService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  removeCategory(categoryId: string) {
    return this.prismaService.productCategory.deleteMany({
      where: { categoryId },
    });
  }

  remove(id: string) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
