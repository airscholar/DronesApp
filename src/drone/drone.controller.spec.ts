import { Test, TestingModule } from '@nestjs/testing';
import { DroneController } from './drone.controller';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { DroneState } from './entities/drone.entity';

describe('DroneController', () => {
  let droneController: DroneController;
  let droneService: DroneService;
  const tempDrone = [
    {
      Id: 1,
      SerialNumber: '12345',
      Model: 'Test',
      WeightLimit: 100,
      BatteryCapacity: 100,
      State: DroneState.IDLE,
      Medication: [],
      CreatedAt: new Date('2022-05-14T12:32:40.223Z'),
      UpdatedAt: new Date('2022-05-14T12:32:40.223Z'),
    },
    {
      Id: 2,
      SerialNumber: '12346',
      Model: 'Test2',
      WeightLimit: 200,
      BatteryCapacity: 200,
      State: DroneState.IDLE,
      Medication: [],
      CreatedAt: new Date('2022-05-14T12:32:40.223Z'),
      UpdatedAt: new Date('2022-05-14T12:32:40.223Z'),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DroneController],
      providers: [DroneService],
    }).compile();

    droneController = module.get<DroneController>(DroneController);
    droneService = module.get<DroneService>(DroneService);
  });

  it('should be defined', () => {
    expect(droneController).toBeDefined();
  });

  it('should return array of drones', async () => {
    jest.spyOn(droneService, 'findAllDrones').mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve(tempDrone);
        }),
    );

    expect(await droneController.findAll()).toStrictEqual({
      message: 'Drones fetched successfully',
      results: tempDrone,
    });
    expect(droneService.findAllDrones).toHaveBeenCalledTimes(1);
  });

  it('should return an existing drone with ID 1', async () => {
    jest.spyOn(droneService, 'findById').mockImplementation(
      (id) =>
        new Promise((resolve) => {
          const idx = tempDrone.findIndex((drone) => drone.Id === id);
          resolve(tempDrone[idx]);
        }),
    );
    expect(await droneController.findById('1')).toEqual({
      message: 'Drone fetched successfully',
      results: {
        Id: 1,
        SerialNumber: '12345',
        Model: 'Test',
        WeightLimit: 100,
        BatteryCapacity: 100,
        State: DroneState.IDLE,
        CreatedAt: new Date('2022-05-14T12:32:40.223Z'),
        UpdatedAt: new Date('2022-05-14T12:32:40.223Z'),
      },
    });
    expect(await (await droneController.findById('1')).results.Id).toEqual(1);
  });

  it('should return empty if drone with ID 0 does not exist', async () => {
    jest.spyOn(droneService, 'findById').mockImplementation(
      (id) =>
        new Promise((resolve) => {
          const idx = tempDrone.findIndex((drone) => drone.Id === id);
          const res = tempDrone[idx];
          resolve(res);
        }),
    );

    expect(await (await droneController.findById('0')).results).toStrictEqual(
      {},
    );
    expect(await (await droneController.findById('0')).message).toStrictEqual(
      'Drone not found',
    );
  });

  it('should create a new drone', async () => {
    jest.spyOn(droneService, 'createDrone').mockImplementation(
      (drone: CreateDroneDto) =>
        new Promise((resolve) => {
          const newDrone = {
            ...drone,
            Id: 3,
            CreatedAt: new Date('2022-05-14T12:32:40.223Z'),
            UpdatedAt: new Date('2022-05-14T12:32:40.223Z'),
          };
          tempDrone.push(newDrone);
          resolve(newDrone);
        }),
    );

    expect(
      await droneController.createDrone({
        SerialNumber: '12347',
        Model: 'Test',
        WeightLimit: 100,
        BatteryCapacity: 100,
        State: DroneState.IDLE,
      }),
    ).toStrictEqual({
      message: 'Drone created successfully',
      results: {
        Id: 3,
        SerialNumber: '12347',
        Model: 'Test',
        WeightLimit: 100,
        BatteryCapacity: 100,
        State: DroneState.IDLE,
        Medication: [],
        CreatedAt: new Date('2022-05-14T12:32:40.223Z'),
        UpdatedAt: new Date('2022-05-14T12:32:40.223Z'),
      },
    });

    expect(tempDrone.length).toEqual(3);
  });
});
