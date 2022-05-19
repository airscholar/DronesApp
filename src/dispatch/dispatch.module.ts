import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { Drone } from 'src/drone/entities/drone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationModule } from 'src/medication/medication.module';
import { Medication } from 'src/medication/entities/medication.entity';
import { AppLogger } from 'src/utils/logger';

@Module({
  imports: [TypeOrmModule.forFeature([Drone, Medication])],
  controllers: [DispatchController],
  providers: [DispatchService, AppLogger],
})
export class DispatchModule {}
