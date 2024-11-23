import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: { email: string }) {
    return this.jwtService.sign(payload);
  }

  verify(token: string) {
    return this.jwtService.verify(token);
  }
}
