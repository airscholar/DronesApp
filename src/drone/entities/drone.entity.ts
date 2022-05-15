import { Max, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum DroneState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING',
}

export enum DroneModel {
  LIGHTWEIGHT = 'LIGHTWEIGHT',
  MIDDLEWEIGHT = 'MIDDLEWEIGHT',
  CRUISERWEIGHT = 'CRUISERWEIGHT',
  HEAVYWEIGHT = 'HEAVYWEIGHT',
}

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  @MaxLength(100)
  SerialNumber: string;

  @Column({
    type: 'enum',
    enum: DroneModel,
  })
  Model: string;

  @Column()
  @Max(500)
  WeightLimit: number;

  @Column()
  BatteryCapacity: number;

  @Column({
    type: 'enum',
    enum: DroneState,
    default: DroneState.IDLE,
  })
  State: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  CreatedAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  UpdatedAt: Date;
}