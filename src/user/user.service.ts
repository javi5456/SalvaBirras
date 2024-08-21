import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/order/Order.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
  async findOne(id: string): Promise<User | undefined> {
    const result = await this.usersRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async getAllUsers(): Promise<User[]> {
    const result = await this.usersRepository.find({
      select: ['id', 'name', 'email'],
      relations: ['order'],
    });
    return result;
  }
  async createUser(user): Promise<User> {
    try {
      const result = await this.usersRepository.findOne({
        where: { email: user.email },
      });
      if (result) {
        throw new HttpException('Email ya registrado', HttpStatus.CONFLICT);
      }
      user.password = await bcrypt.hash(user.password, 10);
      delete user.password;
      const order = new Order();
      order.total = 0;
      order.user = user;
      const savedUser = await this.usersRepository.save(user);
      await this.orderRepository.save(order);
      return savedUser;
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
  async deleteUser(user) {
    try {
      const result = await this.usersRepository.findOne({
        where: { email: user.email },
      });
      if (!result) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      await this.usersRepository.delete(user);
      return { message: 'Usuario eliminado correctamente' };
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
}
