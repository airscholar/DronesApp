import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import serverConfig from './config/env.config';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: serverConfig.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: ['**/*.entity{ .ts,.js}'],
};
