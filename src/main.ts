import { NestFactory } from '@nestjs/core';
import serverConfig from './config/env.config';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppLogger } from './utils/logger';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Drones App')
    .setDescription('This is a drone app')
    .setVersion('0.1.0')
    .addServer('/api/v1/')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  if (serverConfig.NODE_ENV === 'development') {
    setupSwagger(app);
  }
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(serverConfig.PORT || 3000);
  AppLogger.verbose(`Application is listening on port ${serverConfig.PORT}`);
}
bootstrap();
