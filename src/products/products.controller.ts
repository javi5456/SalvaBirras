import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './Product.entity';
import { CreateProductDto } from './Produc.dto';
import { RolesGuard } from 'src/guard/role.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/user/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll(): Promise<Products[]> {
    return await this.productsService.findAll();
  }
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/:name')
  async findOne(@Param() name: string): Promise<Products | undefined> {
    return await this.productsService.findOne(name);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() product: CreateProductDto): Promise<Products> {
    return await this.productsService.create(product);
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/updateProduct')
  async update(@Body() data): Promise<Products> {
    const { id, product } = data;
    return await this.productsService.update(id, product);
  }
}
