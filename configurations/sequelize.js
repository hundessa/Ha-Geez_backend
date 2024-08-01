import { Sequelize } from "sequelize";
import { pool } from "./config.js";

//  const sequelize = new Sequelize(
//  "ha",
//  "postgres",
//  "hundessa",
//   {
//     host: pool.host,
//     dialect: "postgres",
//     port: pool.port,
//   }
// );

// export default sequelize;



// const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
