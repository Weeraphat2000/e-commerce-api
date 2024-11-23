import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/config/prisma.service';
import { ProductImages } from 'src/type/productImages';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: {
    title: string;
    description: string;
    price: number;
    quantity: number;
  }) {
    return this.prismaService.product.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.product.findMany({
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  findById(id: string) {
    return this.prismaService.product.findFirst({
      where: { id },
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  update(
    id: string,
    updateProductDto: {
      title?: string;
      description?: string;
      price?: number;
      quantity?: number;
    },
  ) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  removeImages(productId: string) {
    return this.prismaService.image.deleteMany({
      where: { productId },
    });
  }

  removeCategory(productId: string) {
    return this.prismaService.productCategory.deleteMany({
      where: { productId },
    });
  }

  createImages(images: ProductImages) {
    return this.prismaService.image.create({
      data: images,
    });
  }

  createCategory(productId: string, categoryId: string) {
    return this.prismaService.productCategory.create({
      data: {
        productId,
        categoryId,
      },
    });
  }

  findCategory(categoryId: string) {
    return this.prismaService.category.findFirst({
      where: { id: categoryId },
    });
  }

  searchLimitOffsetPriceCategorySort(
    search: string,
    limit: number,
    offset: number,
    priceMin: number,
    priceMax: number,
    category: string[],
    sortKey: string,
    sortOrder: string,
  ) {
    return this.prismaService.product.findMany({
      where: {
        productCategory: {
          some: {
            categoryId: {
              in: category,
            },
          },
        },
        AND: [
          {
            price: {
              gte: priceMin,
              lte: priceMax,
            },
          },
          {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
            ],
          },
        ],
      },
      take: limit,
      skip: offset,
      orderBy: {
        [sortKey]: sortOrder,
      },
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffsetPriceCategory(
    search: string,
    limit: number,
    offset: number,
    priceMin: number,
    priceMax: number,
    category: string[],
  ) {
    return this.prismaService.product.findMany({
      where: {
        productCategory: {
          some: {
            categoryId: {
              in: category,
            },
          },
        },
        AND: [
          {
            price: {
              gte: priceMin,
              lte: priceMax,
            },
          },
          {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
            ],
          },
        ],
      },
      take: limit,
      skip: offset,
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffsetPriceSort(
    search: string,
    limit: number,
    offset: number,
    priceMin: number,
    priceMax: number,
    sortKey: string,
    sortOrder: string,
  ) {
    return this.prismaService.product.findMany({
      where: {
        AND: [
          {
            price: {
              gte: priceMin,
              lte: priceMax,
            },
          },
          {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
            ],
          },
        ],
      },
      take: limit,
      skip: offset,
      orderBy: {
        [sortKey]: sortOrder,
      },
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffsetCategorySort(
    search: string,
    limit: number,
    offset: number,
    category: string[],
    sortKey: string,
    sortOrder: string,
  ) {
    return this.prismaService.product.findMany({
      where: {
        productCategory: {
          some: {
            categoryId: {
              in: category,
            },
          },
        },
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      take: limit,
      skip: offset,
      orderBy: {
        [sortKey]: sortOrder,
      },
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffsetPrice(
    search: string,
    limit: number,
    offset: number,
    priceMin: number,
    priceMax: number,
  ) {
    return this.prismaService.product.findMany({
      where: {
        AND: [
          {
            price: {
              gte: priceMin,
              lte: priceMax,
            },
          },
          {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                description: {
                  contains: search,
                },
              },
            ],
          },
        ],
      },
      take: limit,
      skip: offset,
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffsetCategory(
    search: string,
    limit: number,
    offset: number,
    category: string[],
  ) {
    return this.prismaService.product.findMany({
      where: {
        productCategory: {
          some: {
            categoryId: {
              in: category,
            },
          },
        },
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      take: limit,
      skip: offset,
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffsetSort(
    search: string,
    limit: number,
    offset: number,
    sortKey: string,
    sortOrder: string,
  ) {
    return this.prismaService.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      take: limit,
      skip: offset,
      orderBy: {
        [sortKey]: sortOrder,
      },
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  searchLimitOffset(search: string, limit: number, offset: number) {
    return this.prismaService.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      take: limit,
      skip: offset,
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  limitOffset(limit: number, offset: number) {
    return this.prismaService.product.findMany({
      take: limit,
      skip: offset,
      include: {
        images: true,
        productCategory: {
          include: {
            category: true,
          },
        },
      },
    });
  }
}
