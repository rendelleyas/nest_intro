import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers);
    const secret = process.env.JWT_SECRET;

    const token = req.headers?.['token'] as string;

    console.log('secret from middleware', secret, token);

    try {
      await this.jwtService.verifyAsync(token, {
        secret,
      });
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }

    next();
  }
}
