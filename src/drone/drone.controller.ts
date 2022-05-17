import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { IServiceResponse } from 'src/interface/interface';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';

@UseGuards(JwtGuard)
@ApiTags('Drones')
@Controller('drones')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post()
  async createDrone(
    @Body() createDroneDto: CreateDroneDto,
  ): Promise<IServiceResponse> {
    // console.log(createDroneDto);
    const res = await this.droneService.createDrone(createDroneDto);
    // console.log(res);
    if (res instanceof Error) {
      throw new InternalServerErrorException(res.message);
    }

    return {
      message: 'Drone created successfully',
      results: res,
    };
  }

  @Get()
  async findAll(): Promise<IServiceResponse> {
    const res = await this.droneService.findAllDrones();

    return {
      message: 'Drones fetched successfully',
      results: res,
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IServiceResponse> {
    const res = await this.droneService.findById(+id);

    if (res instanceof Error) {
      throw res;
    } else if (res === undefined) {
      return {
        message: 'Drone not found',
        results: {},
      };
    }
    return {
      message: 'Drone fetched successfully',
      results: res,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDroneDto: UpdateDroneDto,
  ): Promise<IServiceResponse> {
    const res = await this.droneService.updateDrone(+id, updateDroneDto);

    return {
      message: 'Drone updated successfully',
      results: res,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IServiceResponse> {
    await this.droneService.removeDrone(+id);

    return {
      message: 'Drone removed successfully',
      results: {},
    };
  }

  @Get(':id/batteryLevel')
  async batteryLevel(@Param('id') dronedId: number): Promise<IServiceResponse> {
    const res = await this.droneService.batteryLevel(dronedId);

    return {
      message: 'Battery level fetched successfully',
      results: res,
    };
  }
}
