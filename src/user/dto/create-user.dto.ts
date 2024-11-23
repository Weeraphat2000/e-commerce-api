import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Matches } from 'class-validator';

export class ChangeEnabledDto {
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '1',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: Boolean,
    description: 'Enabled status',
    example: true,
    required: true,
  })
  @IsBoolean()
  enabled: boolean;
}

export class ChangeRoleDto {
  @ApiProperty({
    type: String,
    description: 'User ID',
    example: '1',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Role',
    example: 'admin',
    required: true,
  })
  @IsString()
  @Matches(/^(admin|user)$/, {
    message: 'Role must be either admin or user',
  })
  role: string;
}

export class AddressDto {
  @ApiProperty({
    type: String,
    description: 'Address',
    example: '123 Main St',
    required: true,
  })
  @IsString()
  address: string;
}
