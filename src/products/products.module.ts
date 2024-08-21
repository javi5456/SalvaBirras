import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './Product.entity';
import { JwtService } from '@nestjs/jwt';
import { ProductSeeder } from './product-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductsService, JwtService, ProductSeeder],
  controllers: [ProductsController],
})
export class ProductsModule {}
