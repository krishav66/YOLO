// app.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimiterMiddleware } from './middlewares/rate-limiter.middleware';
import { GeneralMiddleware } from './middlewares/general.middleware';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mydatabase'),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware, GeneralMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
