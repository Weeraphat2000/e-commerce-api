import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  // parameter ก็คือ req, res, next ต้องเรียงตามนี้ ไม่เช่นนั้นจะ error  แต่ไม่ต้อง return อะไรกลับไป
  use(req: Request, res: Response, next: NextFunction) {
    console.log('...........testMiddleware..........');
    console.log(req.body, 'body');
    console.log('logger ....');
    next();
  }
}
