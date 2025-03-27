require('dotenv').config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { userEntity } from "./entity/userEntity";
import { productEntity } from "./entity/productEntity";
import { cartEntity } from "./entity/cartEntity";
import { orderEntity } from "./entity/orderEntity";
import { permissionEntity } from "./entity/permissionEntity";
import { rolePermissionEntity } from "./entity/rolePermissionEntity";
import { roleEntity } from "./entity/roleEntity";
import { routesEntity } from "./entity/routesEntity";

if (process.env.NODE_ENV === 'production') {
  var dbHost: any = process.env.DB_HOST_PROD
} else {
  var dbHost: any = process.env.DB_HOST
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "Application",

  synchronize: true,
  logging: false,

  entities: [
    userEntity, productEntity, cartEntity, orderEntity,
    roleEntity, routesEntity, permissionEntity, rolePermissionEntity
  ],

  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});