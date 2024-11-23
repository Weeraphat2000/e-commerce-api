import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto, ImageDto } from './create-product.dto';

import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The title of the product',
    type: String,
    required: false,
    example: 'Product 1',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The description of the product',
    type: String,
    required: false,
    example: 'Product 1',
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    required: false,
    example: 100,
  })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The quantity of the product',
    type: Number,
    required: false,
    example: 10,
  })
  quantity?: number;

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

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    description: 'The category of the product',
    type: String,
    required: true,
    example: ['category1', 'category2'],
  })
  category: string[];
}
