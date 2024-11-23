import { Controller, Post, Body, Patch, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AddressDto,
  ChangeEnabledDto,
  ChangeRoleDto,
} from './dto/create-user.dto';

import { Auth } from 'src/auth/decorators/auth.decoratos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/model/role.enum';
import { CustomRequest } from 'src/config/req';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Find all user (admin)',
    description: 'Find all user',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Change enabled user (admin)',
    description: 'Change enabled user',
  })
  @Post('/change-enabled')
  async changeStatus(@Body() body: ChangeEnabledDto) {
    const user = await this.userService.changeStatus({
      id: body.id,
      enabled: body.enabled,
    });
    delete user.password;
    return user;
  }

  @Auth(Role.ADMIN)
  @ApiOperation({
    summary: 'Change role user (admin)',
    description: 'Change role user',
  })
  @Post('/change-role')
  async changeRole(@Body() createUserDto: ChangeRoleDto) {
    const user = await this.userService.changeRole({
      id: createUserDto.id,
      role: createUserDto.role,
    });
    delete user.password;
    return user;
  }

  @Auth(Role.USER)
  @ApiOperation({
    summary: 'Update address user (user)',
    description: 'Update address user',
  })
  @Patch('/address')
  async createAddress(
    @Body() addressDto: AddressDto,
    @Req() req: CustomRequest,
  ) {
    const user = await this.userService.updateAddress({
      id: req.user.id,
      address: addressDto.address,
    });
    delete user.password;
    return user;
  }
}
