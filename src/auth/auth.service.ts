import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/User.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly usersService: UserService,
    private readonly jwtservice: JwtService,
  ) {}
  async login(email, password) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new HttpException(
          'Email o contraseña incorrectos',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const verifPass = await bcrypt.compare(password, user.password);
      if (!verifPass) {
        throw new HttpException(
          'Email o contraseña incorrectos',
          HttpStatus.UNAUTHORIZED,
        );
      }
      delete user.password;
      const userPayload = {
        id: user.id,
        email: user.email,
        rol: user.rol,
      };
      const token = this.jwtservice.sign(userPayload);
      return { success: 'Usuario logueado', token, user };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error en el servidor. Intente nuevamente más tarde☺.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
