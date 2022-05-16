import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { DispatchService } from './dispatch.service';

@UseGuards(JwtGuard)
@Controller('dispatch')
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Get('drones/:droneId/medications/:medId')
  async loadDrone(
    @Param('droneId') droneId: number,
    @Param('medId') medicationId: number,
  ) {
    await this.dispatchService.loadDrone({ droneId, medicationId });
  }

  async checkDroneForMedication() {}

  async checkAvaiableDrone() {}

  async checkDroneBattery(droneId: number) {}
}
