import { Products } from 'src/products/Product.entity';
import { User } from 'src/user/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 0 })
  total: number;

  @OneToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Products, (products) => products.order)
  @JoinColumn({ name: 'product_id' })
  products: Products[];
}
