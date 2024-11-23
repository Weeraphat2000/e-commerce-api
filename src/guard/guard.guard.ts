import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from 'src/config/jwt.service';

@Injectable()
export class Guard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

      const headers = context.switchToHttp().getRequest().headers;
      if (
        !headers.authorization ||
        !headers.authorization.startsWith('Bearer ')
      ) {
        return false;
      }
      const token = headers.authorization.split(' ')[1];

      const payload = this.jwtService.verify(token);

      const user = await this.authService.findUserByEmail(payload.email);

      if (!user) {
        return false;
      }

      if (!user.enabled) {
        const response = context.switchToHttp().getResponse();
        response.status(403).json({
          statusCode: 403,
          message: 'User is not active',
        });
      }

      delete user.password;

      const request = context.switchToHttp().getRequest();
      request.user = user;

      if (roles.length === 0) {
        return true;
      } else {
        return roles.includes(user.role);
      }
    } catch (e) {
      return false;
    }
  }
}
