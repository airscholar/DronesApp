import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './auth/entities/User.entity';
import serverConfig from './config/env.config';
import { Drone } from './drone/entities/drone.entity';
import { Medication } from './medication/entities/medication.entity';

const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: serverConfig.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ['**/*.entity{ .ts,.js}', User, Drone, Medication],
  migrations: ['dist/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
export default ORMConfig;
