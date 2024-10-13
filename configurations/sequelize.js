import { Sequelize } from "sequelize";
// import { pool } from "./config.js";

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

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
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
