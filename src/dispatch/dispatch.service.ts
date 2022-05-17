import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DroneService } from 'src/drone/drone.service';
import { Drone, DroneState } from 'src/drone/entities/drone.entity';
import { Medication } from 'src/medication/entities/medication.entity';
import { MedicationService } from 'src/medication/medication.service';
import { Repository } from 'typeorm';
import { MedDroneDTO } from './dto/dispatch.dto';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(Drone) private droneRepository: Repository<Drone>,
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async loadDrone(payload: MedDroneDTO) {
    let result = await this.fetchDroneAndMedication(payload);
    let drone = result.drone,
      medication = result.medication;

    if (drone.State !== DroneState.IDLE) {
      throw new BadRequestException('Drone is not idle');
    }

    let size =
      drone.Medication.reduce((acc, val) => acc + val.Weight, 0) +
      medication.Weight;

    if (size > drone.WeightLimit) {
      throw new BadRequestException('Drone weight limit exceeded');
    }

    let isExist = drone.Medication.findIndex((x) => x.Code == medication.Code);
    if (isExist >= 0) {
      throw new BadRequestException('Medication already loaded');
    }
    medication.Drone = drone;

    drone.State = DroneState.LOADING;
    await this.droneRepository.save(drone);
    drone.State = DroneState.LOADED;
    let savedDrone = await this.droneRepository.save(drone);
    this.medicationRepository.save(medication);

    return {
      message: 'Drone loaded',
      results: savedDrone,
    };
  }

  async checkDroneForMedication(payload: MedDroneDTO) {
    let result = await this.fetchDroneAndMedication(payload);
    let drone = result.drone,
      medication = result.medication;

    let isExist = drone.Medication.findIndex((x) => x.Code == medication.Code);
    if (isExist >= 0) {
      return {
        message: 'Drone loaded with medication',
        results: drone.Medication.filter((x) => x.Code == medication.Code),
      };
    }
    return {
      message: 'Drone not loaded',
      results: {},
    };
  }

  async fetchDroneAndMedication(payload: MedDroneDTO) {
    let drone = await this.droneRepository.findOne({ Id: payload.droneId });
    if (!drone || drone instanceof Error) {
      throw new NotFoundException('Drone not found');
    }

    let medication = await this.medicationRepository.findOne({
      Id: payload.medicationId,
    });
    if (!medication || medication instanceof Error) {
      throw new NotFoundException('Medication not found');
    }

    return { drone, medication };
  }

  async checkAvailableDrone() {
    let drones = await this.droneRepository.find({
      where: {
        State: DroneState.IDLE,
      },
    });
    if (!drones || drones instanceof Error) {
      throw new NotFoundException('No drones available');
    }
    return {
      message: 'Drones available',
      results: drones,
    };
  }
}
