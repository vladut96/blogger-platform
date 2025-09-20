import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { RequestListener } from 'http';
import { Request, Response } from 'express';

let cachedApp: INestApplication | null = null;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // ⚡️ превращает plain object в instance твоего DTO
        whitelist: true, // ⚡️ убирает поля, которых нет в DTO
        forbidNonWhitelisted: false, // если true → выбросит ошибку на лишние поля
      }),
    );
    await app.init(); // ⚡️ без listen
    cachedApp = app;
  }
  return cachedApp.getHttpAdapter().getInstance() as RequestListener;
}

// Если запускаем локально → стандартный bootstrap с app.listen()
if (!process.env.VERCEL) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // ⚡️ превращает plain object в instance твоего DTO
        whitelist: true, // ⚡️ убирает поля, которых нет в DTO
        forbidNonWhitelisted: false, // если true → выбросит ошибку на лишние поля
      }),
    );
    await app.listen(process.env.PORT ?? 3000);
    console.log(
      `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
  })();
}

export default async function handler(req: Request, res: Response) {
  const app = await bootstrap();
  return app(req, res);
}
