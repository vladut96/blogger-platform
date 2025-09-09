import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { RequestListener } from 'http';

let cachedApp: INestApplication | null = null;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
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
    await app.listen(process.env.PORT ?? 3000);
    console.log(
      `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
    );
  })();
}

// Экспортируем handler для Vercel
export default async function handler(req, res) {
  const app = await bootstrap();
  return app(req, res);
}
