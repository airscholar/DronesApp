import { NestFactory } from '@nestjs/core';
import serverConfig from './config/env.config';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  if (serverConfig.NODE_ENV === 'development') {
    setupSwagger(app);
  }
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
