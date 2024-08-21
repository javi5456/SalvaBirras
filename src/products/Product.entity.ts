import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from 'src/order/Order.entity';
@Entity({ name: 'Products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  stock: number;
  @ManyToOne(() => Order, (order) => order.products)
  @JoinColumn({ name: 'order_id' })
  order: Order[];
}
