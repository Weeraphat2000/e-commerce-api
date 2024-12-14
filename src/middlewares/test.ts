import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('...........testMiddleware..........');
    console.log(req.body, 'body');
    console.log('logger ....');
    next();
  }
}
