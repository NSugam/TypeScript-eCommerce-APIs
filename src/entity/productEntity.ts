import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity({ name: "producttable" })
export class productEntity extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  title: string;

  @Column({ nullable: false, type: 'varchar' })
  description: string;

  @Column({ nullable: false, type: 'int' })
  price: Number;

  @Column({ nullable: false, type: 'varchar' })
  stock: string;

  @Column({ nullable: false, type: 'varchar', unique:true })
  sku: string;

}