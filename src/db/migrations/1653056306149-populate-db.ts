import { User } from '../../auth/entities/User.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  Drone,
  DroneModel,
  DroneState,
} from '../../drone/entities/drone.entity';
import { Medication } from '../../medication/entities/medication.entity';

export class populateDb1653056306149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // seed the database
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'airscholar@gmail.com',
          password: '123456',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'test@gmail.com',
          password: '123456',
        },
      ]),
    );

    await queryRunner.manager.save(
      queryRunner.manager.create<Drone>(Drone, [
        {
          SerialNumber: 'D123456789a',
          Model: DroneModel.LIGHTWEIGHT,
          WeightLimit: 50,
          BatteryCapacity: 100,
          BatteryLevel: 100,
          State: DroneState.IDLE,
        },
        {
          SerialNumber: 'D123456789b',
          Model: DroneModel.MIDDLEWEIGHT,
          WeightLimit: 100,
          BatteryCapacity: 200,
          BatteryLevel: 200,
          State: DroneState.IDLE,
        },
        {
          SerialNumber: 'D123456789c',
          Model: DroneModel.CRUISERWEIGHT,
          WeightLimit: 200,
          BatteryCapacity: 300,
          BatteryLevel: 300,
          State: DroneState.IDLE,
        },
        {
          SerialNumber: 'D123456789d',
          Model: DroneModel.HEAVYWEIGHT,
          WeightLimit: 300,
          BatteryCapacity: 400,
          BatteryLevel: 400,
          State: DroneState.IDLE,
        },
      ]),
    );

    await queryRunner.manager.save(
      queryRunner.manager.create<Medication>(Medication, [
        {
          Name: 'Aspirin',
          Weight: 50,
          Code: 'ASP100',
          Image: 'aspirin.jpg',
        },
        {
          Name: 'Paracetamol',
          Weight: 100,
          Code: 'PAR200',
          Image: 'paracetamol.jpg',
        },
        {
          Name: 'Ibuprofen',
          Weight: 150,
          Code: 'IBU300',
          Image: 'ibuprofen.jpg',
        },
        {
          Name: 'Advil',
          Weight: 200,
          Code: 'ADV400',
          Image: 'advil.jpg',
        },
      ]),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // remove all the data
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "medication"`);
    await queryRunner.query(`DELETE FROM "drone"`);
  }
}
