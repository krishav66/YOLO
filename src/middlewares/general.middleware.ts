// general.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GeneralMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    
    console.log('General Middleware executed.');
    next();
  }
}
