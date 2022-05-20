import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  Max,
  MaxLength,
} from 'class-validator';
import { DroneModel, DroneState } from '../entities/drone.entity';

export class CreateDroneDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  @MaxLength(100)
  SerialNumber: string;

  @IsNotEmpty()
  @IsEnum(DroneModel)
  Model: string;

  @IsNotEmpty()
  @Max(500)
  WeightLimit: number;

  @IsNotEmpty()
  BatteryCapacity: number;

  @IsNotEmpty()
  @IsEnum(DroneState)
  State: DroneState;
}
