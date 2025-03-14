import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

@Entity({ name: "usertable" })
export class userEntity extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false, type: 'varchar', unique: true })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  phone: string;

  @Column({ nullable: false, type: 'varchar' })
  role: string;

}