import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity({ name: "userCart" })
export class cartEntity extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  username: string;

  @Column({ nullable: true, type: 'varchar' })
  productId: string;

  @Column({ nullable: true, type: 'int' })
  qty: number;

}