import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IServiceResponse } from 'src/interface/interface';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './entities/medication.entity';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async assignMedication(
    createMedicationDto: CreateMedicationDto | UpdateMedicationDto,
  ): Promise<Medication> {
    const medication = new Medication();

    if (createMedicationDto.Name) medication.Name = createMedicationDto.Name;
    if (createMedicationDto.Weight)
      medication.Weight = createMedicationDto.Weight;
    if (createMedicationDto.Code) medication.Code = createMedicationDto.Code;
    if (createMedicationDto.Image) medication.Image = createMedicationDto.Image;

    return medication;
  }

  async createMedication(
    createMedicationDto: CreateMedicationDto,
  ): Promise<IServiceResponse> {
    try {
      const newMedication = await this.assignMedication(createMedicationDto);
      newMedication.CreatedAt = new Date();
      newMedication.UpdatedAt = new Date();

      const med = await this.medicationRepository.save(newMedication);
      return {
        message: 'Medication created successfully',
        results: med,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.detail);
    }
  }

  async findAll(): Promise<IServiceResponse> {
    try {
      const medications = await this.medicationRepository.find({});
      return {
        message: 'Medications retrieved successfully',
        results: medications ?? medications,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        `Error occured while fetching medications`,
      );
    }
  }

  async findById(id: number): Promise<Medication> {
    try {
      const medication = await this.medicationRepository.findOne({
        where: {
          Id: id,
        },
      });

      return medication ?? medication;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        `Unable to fetch a medication with ID ${id}`,
      );
    }
  }

  async findMedicationById(id: number): Promise<IServiceResponse | Error> {
    const medication = await this.findById(id);

    if (medication instanceof Error) {
      throw medication;
    }

    if (!medication) {
      return {
        message: 'Medication not found',
        results: {},
      };
    }
    return {
      message: 'Medication fetched successfully',
      results: medication,
    };
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const existingMedication = await this.findById(id);

    if (!existingMedication || existingMedication instanceof Error) {
      throw existingMedication;
    }

    try {
      // update the existing medication with the new values
      if (updateMedicationDto.Name)
        existingMedication.Name = updateMedicationDto.Name;
      if (updateMedicationDto.Weight)
        existingMedication.Weight = updateMedicationDto.Weight;
      if (updateMedicationDto.Code)
        existingMedication.Code = updateMedicationDto.Code;
      if (updateMedicationDto.Image)
        existingMedication.Image = updateMedicationDto.Image;
      existingMedication.UpdatedAt = new Date();

      return {
        message: 'Medicine updated successfully',
        results: await this.medicationRepository.save(existingMedication),
      };
    } catch (err) {
      return new InternalServerErrorException(
        `Error occured while updating medication`,
      );
    }
  }

  async remove(id: number) {
    const existingMedication = await this.findById(id);

    if (!existingMedication || existingMedication instanceof Error) {
      throw existingMedication;
    }

    try {
      await this.medicationRepository.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(
        `Error occured while deleting medication`,
      );
    }
  }
}
