import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.rol || user.rol !== 'admin') {
      throw new HttpException('Acceso no autorizado', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
