require('dotenv').config();
import "reflect-metadata";
import { DataSource } from "typeorm";
import { userEntity } from "./entity/userEntity";
import { productEntity } from "./entity/productEntity";
import { cartEntity } from "./entity/cartEntity";
import { orderEntity } from "./entity/orderEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "Application",

  synchronize: true,
  logging: false,
  entities: [userEntity, productEntity, cartEntity, orderEntity],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});