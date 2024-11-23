import {
  Controller,
  Body,
  Patch,
  Param,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { DeliveringService } from './delivering.service';

import { UpdateDeliveringDto } from './dto/update-delivering.dto';
import { Auth } from 'src/auth/decorators/auth.decoratos';
import { Role } from 'src/model/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('delivering')
@Auth(Role.ADMIN)
@ApiTags('delivering')
export class DeliveringController {
  constructor(private readonly deliveringService: DeliveringService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update status (admin)' })
  async update(
    @Param('id') id: string,
    @Body() updateDeliveringDto: UpdateDeliveringDto,
  ) {
    const hasOrder = await this.deliveringService.findOrderByOrderId(id);

    if (!hasOrder) {
      throw new NotFoundException('Order not found');
    }

    return this.deliveringService.update(id, updateDeliveringDto.orderStatus);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order (admin)' })
  findAll() {
    return this.deliveringService.findAll();
  }
}
