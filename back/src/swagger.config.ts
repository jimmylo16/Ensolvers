import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  app.setGlobalPrefix('api', { exclude: ['/'] });

  const config = new DocumentBuilder()
    .setTitle('Ensolvers')
    .setDescription('The Ensolvers docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);
};
