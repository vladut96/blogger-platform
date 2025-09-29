import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { RequestListener } from 'http';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

let cachedApp: INestApplication | null = null;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
          const errorsForResponse = errors.map((e) => ({
            message: Object.values(e.constraints!)[0],
            field: e.property,
          }));
          return new BadRequestException({ errorsMessages: errorsForResponse });
        },
      }),
    );
    await app.init();
    cachedApp = app;
  }
  return cachedApp.getHttpAdapter().getInstance() as RequestListener;
}

// Если запускаем локально → стандартный bootstrap с app.listen()
if (!process.env.VERCEL) {
  (async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
          const errorsForResponse = errors.map((e) => ({
            message: Object.values(e.constraints!)[0],
            field: e.property,
          }));
          return new BadRequestException({ errorsMessages: errorsForResponse });
        },
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
