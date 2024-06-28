import { Sequelize } from "sequelize";
import { pool } from "./config.js";

 const sequelize = new Sequelize(
 "ha",
 "postgres",
 "hundessa",
  {
    host: pool.host,
    dialect: "postgres",
    port: pool.port,
  }
);

export default sequelize;