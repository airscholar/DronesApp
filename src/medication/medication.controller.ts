import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import serverConfig from 'src/config/env.config';

@UseGuards(JwtGuard)
@ApiTags('Medications')
@Controller('medications')
@ApiBearerAuth()
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: serverConfig.UPLOAD_PATH,
      }),
    }),
  )
  async create(
    @Body() createMedicationDto: CreateMedicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createMedicationDto.Image = file.filename;

    return await this.medicationService.createMedication(createMedicationDto);
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
