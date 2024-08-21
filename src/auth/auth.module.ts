import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/User.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Order } from 'src/order/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
