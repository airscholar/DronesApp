import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DroneModule } from './drone/drone.module';
import { ormConfig } from './orm.config';
import { MedicationModule } from './medication/medication.module';
import { DispatchModule } from './dispatch/dispatch.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    DroneModule,
    MedicationModule,
    DispatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
