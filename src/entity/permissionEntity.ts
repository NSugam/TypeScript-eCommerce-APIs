import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    BaseEntity,
} from "typeorm";

@Entity({ name: "permissions" })
export class permissionEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ nullable: false, type: 'varchar' })
    name: string;

    @Column({ nullable: false, type: 'varchar' })
    route: string;

    @Column('simple-array', { nullable: false })
    permissions: string[];
}