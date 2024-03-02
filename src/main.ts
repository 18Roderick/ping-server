import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //habilitar shutdown hook de prisma
  const prismaService = app.get(PrismaService);

  await prismaService.enableShutDownHooks(app);

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('Pingdom Api')
    .setDescription('Api Pingdom')
    .setVersion('1.0')
    .addTag('Pingdom')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
