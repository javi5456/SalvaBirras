import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './Product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from './Produc.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}
  async findAll(): Promise<Products[]> {
    return await this.productsRepository.find();
  }
  async findOne(name: string): Promise<Products | undefined> {
    const result = await this.productsRepository.findOne({
      where: { name: name },
    });
    if (!result) {
      throw new NotFoundException('Producto inexistente');
    }
    return result;
  }
  async create(product): Promise<Products> {
    try {
      const result = await this.productsRepository.findOne({
        where: { name: product.name },
      });
      if (result) {
        throw new HttpException('Producto ya existe', HttpStatus.CONFLICT);
      }
      return await this.productsRepository.save(product);
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
  async update(id, product: UpdateProductDto): Promise<Products> {
    try {
      const result = await this.productsRepository.findOne({
        where: { id: id },
      });
      if (!result) {
        throw new HttpException('Producto inexistente', HttpStatus.NOT_FOUND);
      }
      const verif = await this.productsRepository.findOne({
        where: { name: product.name },
      });
      if (verif) {
        throw new HttpException(
          'Producto ya existente con ese nombre',
          HttpStatus.CONFLICT,
        );
      }
      await this.productsRepository.update(id, product);

      return await this.productsRepository.findOne({
        where: { id: id },
      });
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
  async remove(name: string) {
    try {
      const result = await this.productsRepository.findOne({
        where: { name: name },
      });
      await this.productsRepository.delete({ name: name });
      return 'Producto Eliminado';
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
