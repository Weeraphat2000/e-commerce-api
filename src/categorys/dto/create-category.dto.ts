import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'The name of the category',
    required: true,
    example: 'Category 1',
  })
  @IsString()
  name: string;
}
