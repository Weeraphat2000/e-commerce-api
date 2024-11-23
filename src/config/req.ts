// import { Request } from 'express';

export class CustomRequest extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}
