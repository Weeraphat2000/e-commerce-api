import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDeliveringDto } from './create-delivering.dto';
import { IsString } from 'class-validator';

export class UpdateDeliveringDto extends PartialType(CreateDeliveringDto) {
  @ApiProperty({
    example: 'delivered',
    description: 'The status of the delivering',
    required: false,
    type: String,
  })
  @IsString()
  orderStatus: string;
}
