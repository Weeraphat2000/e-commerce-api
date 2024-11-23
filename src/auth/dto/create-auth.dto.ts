import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
    example: 'password',
  })
  @IsString()
  password: string;
}

export class LoginDTO {
  @ApiProperty({
    type: String,
    description: 'The email of the user',
    required: true,
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
    example: 'password',
  })
  @IsString()
  password: string;
}
