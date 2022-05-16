import { Injectable } from '@nestjs/common';
import { MedDroneDTO } from './dto/dispatch.dto';

@Injectable()
export class DispatchService {
  constructor() {}
  
  async loadDrone(payload: MedDroneDTO) {}

  async checkDroneForMedication(payload: MedDroneDTO) {}
}
