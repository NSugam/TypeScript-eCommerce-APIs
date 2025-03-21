import {
    Entity,
    ManyToOne,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
} from "typeorm";

import { roleEntity } from './roleEntity';
import { routesEntity } from './routesEntity';
import { permissionEntity } from './permissionEntity';

@Entity({ name: "rolePermission" })
export class rolePermissionEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => roleEntity, (role) => role.rolePermissions, { onDelete: 'CASCADE' })
    @JoinColumn()
    role: roleEntity;

    @ManyToOne(() => routesEntity, (route) => route.rolePermissions, { onDelete: 'CASCADE' })
    @JoinColumn()
    route: routesEntity;

    @ManyToOne(() => permissionEntity, (permission) => permission.rolePermissions, { onDelete: 'CASCADE' })
    @JoinColumn()
    permission: permissionEntity;
}