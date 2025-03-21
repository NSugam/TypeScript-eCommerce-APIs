import {
    Entity,
    OneToMany,
    BaseEntity,
    PrimaryColumn,
} from "typeorm";

import { rolePermissionEntity } from './rolePermissionEntity';

@Entity({ name: "routesTable" })
export class routesEntity extends BaseEntity {

    @PrimaryColumn({type:'varchar' })
    name: string;

    @OneToMany(() => rolePermissionEntity, (rolePermission) => rolePermission.route)
    rolePermissions: rolePermissionEntity[];
}