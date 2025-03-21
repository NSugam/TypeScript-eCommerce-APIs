import {
    Entity,
    OneToMany,
    BaseEntity,
    PrimaryColumn,
} from "typeorm";

import { rolePermissionEntity } from './rolePermissionEntity';

@Entity({ name: "rolesTable" })
export class roleEntity extends BaseEntity {

    @PrimaryColumn({type:'varchar' })
    name: string;

    @OneToMany(() => rolePermissionEntity, (rolePermission) => rolePermission.role)
    rolePermissions: rolePermissionEntity[];
}