import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Medications')
@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  async create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.createMedication(createMedicationDto);
  }

  @Get()
  async findAll() {
    return this.medicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.medicationService.findMedicationById(+id);
  }

  @Get('drone/:droneId/')
  async fetchLoadedMedications(@Param('droneId') droneId: number) {
    return await this.medicationService.fetchLoadedMedication(droneId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationService.update(+id, updateMedicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.medicationService.remove(+id);
  }
}
