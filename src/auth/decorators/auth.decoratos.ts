import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Guard } from 'src/guard/guard.guard';
import { Role } from 'src/model/role.enum';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(Guard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
