import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { JwtService } from '@nestjs/jwt';
import { AdminSeederService } from './admin-seeder.service';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/order/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  providers: [UserService, JwtService, AdminSeederService],
  controllers: [UserController],
})
export class UserModule {}
