import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { DispatchService } from './dispatch.service';
import { MedDroneDTO } from './dto/dispatch.dto';

@UseGuards(JwtGuard)
@ApiTags('Dispatch')
@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Post('load')
  async loadDrone(@Body() payload: MedDroneDTO) {
    return await this.dispatchService.loadDrone(payload);
  }

  @Post('check')
  async checkDroneForMedication(@Body() payload: MedDroneDTO) {
    return await this.dispatchService.checkDroneForMedication(payload);
  }

  @ApiBearerAuth()
  @Get('/availableDrones')
  async checkAvaiableDrone() {
    return await this.dispatchService.checkAvailableDrone();
  }
}
