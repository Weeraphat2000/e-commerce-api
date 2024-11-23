import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted properties
      forbidNonWhitelisted: true, // throw an error when non-whitelisted properties are detected
      // transform: true, // transform payloads to DTO instances
    }),
  );
  app.enableCors();

  // morgan
  app.use(morgan('dev'));

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('The E-commerce API description')
    .setVersion('1.0')
    .addBearerAuth() // Add Bearer Auth
    .build();
  config.servers = [{ url: 'http://localhost:3000' }];
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
