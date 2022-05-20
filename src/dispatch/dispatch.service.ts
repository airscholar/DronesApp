import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Drone, DroneState } from '../drone/entities/drone.entity';
import { Medication } from '../medication/entities/medication.entity';
import { Repository } from 'typeorm';
import { MedDroneDTO } from './dto/dispatch.dto';

@Injectable()
export class DispatchService {
  constructor(
    @InjectRepository(Drone) private droneRepository: Repository<Drone>,
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  async dispatchLoadedDrone(droneId: number) {
    const drone = await this.droneRepository.findOne({ Id: droneId });
    if (!drone || drone instanceof Error) {
      throw new NotFoundException('Drone not found');
    }

    if (
      drone.State !== DroneState.LOADED ||
      !drone.Medication ||
      drone.Medication[0] == undefined
    ) {
      throw new BadRequestException('Drone not loaded');
    }

    drone.State = DroneState.DELIVERING;
    await this.droneRepository.save(drone);

    const DELIVERY_TIME_IN_MINS = 5 + Math.random() * 10; // 5-15 mins
    const DISTANCE = 1 + Math.random() * 10; // 1 to 10 km

    // reduce drone battery level by 65% after delivery
    drone.BatteryLevel -=
      drone.BatteryCapacity * ((DISTANCE * DELIVERY_TIME_IN_MINS) / 100);
    drone.BatteryLevel < 0 ? (drone.BatteryLevel = 0) : drone.BatteryLevel;
    drone.State = DroneState.DELIVERED;
    drone.Medication.pop();
    await this.droneRepository.save(drone);

    return {
      message: 'Drone dispatched',
      results: drone,
    };
  }

  async loadDrone(payload: MedDroneDTO) {
    const result = await this.fetchDroneAndMedication(payload);
    const drone = result.drone,
      medication = result.medication;

    if (
      drone.State !== DroneState.IDLE &&
      drone.State !== DroneState.DELIVERED
    ) {
      throw new BadRequestException('Drone is not idle');
    }

    // calculate drone weight limit
    const size =
      drone.Medication.reduce((acc, val) => acc + val.Weight, 0) +
      medication.Weight;

    if (size > drone.WeightLimit) {
      throw new BadRequestException('Drone weight limit exceeded');
    }

    // check if medication is already loaded
    const isExist = drone.Medication.findIndex(
      (x) => x.Code == medication.Code,
    );
    if (isExist >= 0) {
      throw new BadRequestException('Medication already loaded');
    }

    // check if battery level is sufficient
    if (drone.BatteryLevel < drone.BatteryCapacity * 0.25) {
      throw new BadRequestException(
        'Drone battery level is low, please recharge',
      );
    }

    medication.Drone = drone;

    drone.State = DroneState.LOADING;
    await this.droneRepository.save(drone);
    drone.State = DroneState.LOADED;

    // reduce drone battery level by 25% after loading
    drone.BatteryLevel -= drone.BatteryCapacity * 0.25;

    await this.droneRepository.save(drone);
    this.medicationRepository.save(medication);

    return {
      message: 'Drone loaded with medication',
      results: medication,
    };
  }

  async checkDroneForMedication(payload: MedDroneDTO) {
    const result = await this.fetchDroneAndMedication(payload);
    const drone = result.drone,
      medication = result.medication;

    const isExist = drone.Medication.findIndex(
      (x) => x.Code == medication.Code,
    );
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
    console.log({ payload });
    const drone = await this.droneRepository.findOne({ Id: payload.droneId });
    if (!drone || drone instanceof Error) {
      throw new NotFoundException('Drone not found');
    }

    const medication = await this.medicationRepository.findOne({
      Id: payload.medicationId,
    });
    if (!medication || medication instanceof Error) {
      throw new NotFoundException('Medication not found');
    }

    return { drone, medication };
  }

  async checkAvailableDrone() {
    const drones = await this.droneRepository.find({
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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async logDroneBatteryLevel() {
    const drones = await this.droneRepository.find();
    if (!drones || drones instanceof Error) {
      throw new NotFoundException('No drones found');
    }

    drones.forEach((drone) => {
      // AppLogger.log(`Drone ${drone.Id} battery level is ${drone.BatteryLevel}`);
      this.logger.log(`Drone ${drone.Id} battery level ${drone.BatteryLevel}`);
    });

    return {
      message: 'Drones available',
      results: drones,
    };
  }
}
