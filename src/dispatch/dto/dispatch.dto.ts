import { IsNotEmpty, IsNumber } from 'class-validator';

export class MedDroneDTO {
  @IsNotEmpty()
  @IsNumber()
  droneId: number;

  @IsNotEmpty()
  @IsNumber()
  medicationId: number;
}
