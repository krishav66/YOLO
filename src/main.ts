// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    rateLimit({
      windowMs: 1000, 
      max: 10,
    }) as any,
  );

  await app.listen(3000);
}
bootstrap();
