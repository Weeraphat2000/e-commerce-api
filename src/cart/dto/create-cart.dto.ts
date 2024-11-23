import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    description: 'Product ID',
    example: '1',
    required: true,
    type: String,
  })
  @IsString()
  productId: string;
}
