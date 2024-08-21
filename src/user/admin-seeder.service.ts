import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/Order.entity';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.enum';
@Injectable()
export class AdminSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  async createDefaultAdmin() {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Admin1234';

    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
      relations: ['order'],
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      const order = new Order();
      order.total = 0;
      order.products = [];

      const admin = new User();
      admin.name = 'Admin';
      admin.email = adminEmail;
      admin.password = hashedPassword;
      admin.rol = Role.Admin;
      admin.order = order;

      await this.orderRepository.save(order);
      await this.userRepository.save(admin);
    }
  }
}
