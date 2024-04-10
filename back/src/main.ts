import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './swagger.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['/'] });
  const logger = new Logger('Bootstrap');

  swaggerConfig(app);

  await app.listen(process.env.PORT || 3000);
  logger.log(`Application started on port ${process.env.PORT || 3000}`);
}
bootstrap();
