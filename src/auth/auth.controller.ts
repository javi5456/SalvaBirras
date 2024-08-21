import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/User.dto';
import { User } from 'src/user/User.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() userL) {
    const { email, password } = userL;
    return await this.authService.login(email, password);
  }
  @Post('/register')
  async register(@Body() user: CreateUserDto): Promise<Omit<User, 'password'>> {
    return await this.authService.register(user);
  }
}
