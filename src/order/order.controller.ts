import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(public readonly orderService: OrderService) {}
  @Get()
  async getOrder() {
    return await this.orderService.findAll();
  }

  @Post()
  async addProduct(@Body() data) {
    const { userId, productId } = data;
    return await this.orderService.AddProduct(userId, productId);
  }
  @Delete()
  async deleteProduct(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    return await this.orderService.deleteProduct(userId, productId);
  }
}
