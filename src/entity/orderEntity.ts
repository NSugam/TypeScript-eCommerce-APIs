import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn
} from "typeorm";

@Entity({ name: "myOrders" })
export class orderEntity extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  productId: string;

  @Column('simple-json', {nullable: true})
  productInfo: {
    title: string;
    description: string;
    price: string;
  };

  @Column({ nullable: false, type: 'int' })
  qty: number;

  @Column({ nullable: false, type: 'int' })
  TotalAmount: number;

  @Column({ nullable: false, type: 'varchar' })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}