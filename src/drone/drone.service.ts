import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Drone } from './entities/drone.entity';

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(Drone)
    private readonly droneRepository: Repository<Drone>,
  ) {}
  /**
   * assignDrone take the new values from the DTOs and returns a copy drone object
   * @param droneInput (Create or Update DTO)
   * @returns a promise of a new Drone object
   */
  async assignDrone(
    droneInput: CreateDroneDto | UpdateDroneDto,
  ): Promise<Drone> {
    const drone = new Drone();

    if (droneInput.SerialNumber) drone.SerialNumber = droneInput.SerialNumber;
    if (droneInput.Model) drone.Model = droneInput.Model;
    if (droneInput.WeightLimit) drone.WeightLimit = droneInput.WeightLimit;
    if (droneInput.BatteryCapacity)
      drone.BatteryCapacity = droneInput.BatteryCapacity;
    drone.BatteryLevel = droneInput.BatteryCapacity;
    if (droneInput.State) drone.State = droneInput.State;

    return drone;
  }

  async createDrone(createDroneDto: CreateDroneDto): Promise<Drone> {
    try {
      const newDrone = await this.assignDrone(createDroneDto);
      newDrone.CreatedAt = new Date();
      newDrone.UpdatedAt = new Date();

      return await this.droneRepository.save(newDrone);
    } catch (err) {
      throw new InternalServerErrorException(err.detail);
    }
  }

  async findAllDrones(): Promise<Drone[]> {
    try {
      const drones = await this.droneRepository.find({});
      return drones ?? drones;
    } catch (err) {
      // console.log(err);
      throw new InternalServerErrorException(
        `Error occured while fetching drones`,
      );
    }
  }

  async findById(id: number): Promise<Drone | Error> {
    try {
      let drone = await this.droneRepository.findOne({
        where: {
          Id: id,
        },
      });

      if (!drone) return new NotFoundException('Drone is not found');

      return drone;
    } catch (err) {
      // console.log(err);
      return new InternalServerErrorException(
        `Unable to fetch a drone with ID ${id}`,
      );
    }
  }

  async updateDrone(
    id: number,
    updateDroneDto: UpdateDroneDto,
  ): Promise<Drone | Error> {
    let existingDrone = await this.findById(id);

    if (!existingDrone || existingDrone instanceof Error) {
      throw existingDrone;
    }

    try {
      // update the existing drone with the new values
      existingDrone = await this.assignDrone(updateDroneDto);
      existingDrone.UpdatedAt = new Date();

      return await this.droneRepository.save(existingDrone);
    } catch (err) {
      return new InternalServerErrorException(
        `Error occured while updating drone`,
      );
    }
  }

  async removeDrone(id: number) {
    const existingDrone = await this.findById(id);

    if (!existingDrone || existingDrone instanceof Error) {
      throw existingDrone;
    }

    try {
      await this.droneRepository.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(
        `Error occured while deleting drone`,
      );
    }
  }

  async batteryLevel(id: number) {
    const drone = await this.findById(id);

    if (!drone || drone instanceof Error) {
      throw drone;
    }

    return drone.BatteryCapacity;
  }
}
