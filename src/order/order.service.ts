import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './Order.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/products/Product.entity';
import { User } from 'src/user/User.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}
  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }
  async findOne(id: string) {
    return await this.ordersRepository.findOne({ where: { id: id } });
  }
  async AddProduct(userId, productId) {
    const { product, user } = await this.verify(userId, productId);
    if (!user.order.products) {
      user.order.products = [];
    }
    user.order.products.push(product);
    user.order.total += product.price;
    product.stock--;
    await this.productsRepository.save(product);
    return await this.ordersRepository.save(user.order);
  }
  async deleteProduct(userId, productId) {
    const { user, product } = await this.verify(userId, productId);
    const productIndex = user.order.products.findIndex(
      (p) => p.id === productId,
    );
    if (productIndex === -1) {
      throw new HttpException(
        'Producto no encontrado en el pedido',
        HttpStatus.NOT_FOUND,
      );
    }
    user.order.products.splice(productIndex, 1);
    user.order.total -= product.price;
    await this.ordersRepository.save(user.order);
    return user.order;
  }
  async verify(userId, ProductId) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'name', 'email'],
      relations: ['order'],
    });
    const product = await this.productsRepository.findOne({
      where: { id: ProductId },
    });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    if (!product) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    if (product.stock === 0) {
      throw new HttpException('Producto agotado', HttpStatus.FORBIDDEN);
    }
    return { product, user };
  }
}
