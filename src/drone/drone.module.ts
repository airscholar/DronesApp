import { Module } from '@nestjs/common';
import { DroneService } from './drone.service';
import { DroneController } from './drone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './entities/drone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
