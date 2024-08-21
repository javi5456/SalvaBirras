import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/user/roles.enum';
import { ROLES_KEY } from '../common/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException(
        'Acceso no autorizado,Falta token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!roles.includes(user.rol)) {
      throw new HttpException('Acceso no autorizado', HttpStatus.UNAUTHORIZED);
    }

    request.user = user;
    return true;
  }
}
