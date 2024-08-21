import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const decodedToken = await this.jwtService.verifyAsync(token, { secret });
      request.user = decodedToken;

      request.tokenExpiration = new Date(decodedToken.exp * 1000);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }
}
