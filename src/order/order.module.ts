import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/Product.entity';
import { User } from 'src/user/User.entity';
import { Order } from './order.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Products, User, Order])],
  providers: [OrderService, JwtService],
  controllers: [OrderController],
})
export class OrderModule {}
