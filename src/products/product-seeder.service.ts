import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './Product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async onModuleInit() {
    await this.createDefaultProducts();
  }

  async createDefaultProducts() {
    const defaultProducts = [
      {
        name: 'Fernet',
        price: this.getRandomPrice(),
        description: 'A popular Italian herbal liqueur.',
        imgUrl: 'https://example.com/fernet.jpg', // Puedes dejarlo vacío si no es obligatorio
        stock: 100,
      },
      {
        name: 'Coca',
        price: this.getRandomPrice(),
        description: 'A refreshing cola beverage.',
        imgUrl: 'https://example.com/coca.jpg',
        stock: 200,
      },
      {
        name: 'Speed',
        price: this.getRandomPrice(),
        description: 'An energy drink with a boost.',
        imgUrl: 'https://example.com/speed.jpg',
        stock: 150,
      },
    ];

    for (const productData of defaultProducts) {
      const existingProduct = await this.productsRepository.findOne({
        where: { name: productData.name },
      });

      if (!existingProduct) {
        const product = this.productsRepository.create(productData);
        await this.productsRepository.save(product);
      }
    }
  }

  private getRandomPrice(): number {
    return Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
  }
}
