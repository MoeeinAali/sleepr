import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);

  const config = new DocumentBuilder()
    .setTitle('Reservations API')
    .setDescription('API documentation for Reservations service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
