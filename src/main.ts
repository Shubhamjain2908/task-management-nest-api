import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
