// rate-limiter.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import RateLimit from 'express-rate-limit';

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly rateLimiter: any) {}

  async use(req: any, res: any, next: () => void) {
    try {
      await this.rateLimiter.consume(req.ip);
      next();
    } catch (error) {
      res.status(429).send('Too Many Requests');
    }
  }
}