import { IsNotEmpty, IsUppercase, IsUrl } from 'class-validator';

export class CreateMedicationDto {
  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  Weight: number;

  @IsNotEmpty()
  @IsUppercase()
  Code: string;

  Image: string;
}
