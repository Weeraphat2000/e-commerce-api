import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class ImageDto {
  @ApiProperty({
    description: 'URL of the image',
    type: String,
    required: true,
    example:
      'https://res.cloudinary.com/demo/image/upload/v1628580000/sample.jpg',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Asset ID of the image',
    type: String,
    required: true,
    example: 'sample',
  })
  @IsString()
  asset_id: string;

  @ApiProperty({
    description: 'Public ID of the image',
    type: String,
    required: true,
    example: 'sample',
  })
  @IsString()
  public_id: string;

  @ApiProperty({
    description: 'Secure URL of the image',
    type: String,
    required: true,
    example:
      'https://res.cloudinary.com/demo/image/upload/v1628580000/sample.jpg',
  })
  @IsUrl()
  secure_url: string;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'The title of the product',
    type: String,
    required: true,
    example: 'Product 1',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    required: true,
    example: 100,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The quantity of the product',
    type: Number,
    required: true,
    example: 10,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'The title of the product',
    type: String,
    required: true,
    example: 'Product 1',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The category of the product',
    type: String,
    required: true,
    example: ['category1', 'category2'],
  })
  @IsArray()
  @ArrayMinSize(1)
  category: string[];

  @ApiProperty({
    description: 'Images of the product',
    type: [ImageDto],
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}

export class QueryProductDto {
  @ApiProperty({
    description: 'Search query',
    type: String,
    required: false,
    example: 'Product 1',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: 'Limit query',
    type: String,
    required: false,
    example: '10',
  })
  @IsString()
  @IsOptional()
  limit?: string;

  @ApiProperty({
    description: 'Offset query',
    type: String,
    required: false,
    example: '0',
  })
  @IsString()
  @IsOptional()
  offset?: string;

  @ApiProperty({
    description: 'Sort query (createdAt, updatedAt, price, title)',
    type: String,
    required: false,
    example: 'orderBy:createdAt=desc',
  })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({
    description: 'Category id',
    type: String,
    required: false,
    example: 'category:category1,category2',
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({
    description: 'price min',
    type: String,
    required: false,
    example: '100',
  })
  @IsString()
  @IsOptional()
  priceMin?: string;

  @ApiProperty({
    description: 'price max',
    type: String,
    required: false,
    example: '1000',
  })
  @IsString()
  @IsOptional()
  priceMax?: string;
}
