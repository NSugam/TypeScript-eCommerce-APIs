import {
    Entity,
    OneToMany,
    BaseEntity,
    PrimaryColumn,
} from "typeorm";

import { rolePermissionEntity } from './rolePermissionEntity';

@Entity({ name: "permissionTable" })
export class permissionEntity extends BaseEntity {

    @PrimaryColumn({ type:'varchar' })
    name: string;

    @OneToMany(() => rolePermissionEntity, (rolePermission) => rolePermission.permission)
    rolePermissions: rolePermissionEntity[];
}