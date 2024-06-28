import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { LOCALHOST_PORT } from "./configurations/config.js";
import User from "./models/User.js";
import  sequelize  from "./configurations/sequelize.js";
import studentRegistrationRoute from "./routes/registration.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);


(async () => {
  try{
  await sequelize.sync();

  console.log("Database Connected successfully");
  }catch (error) {
    console.log("Error connecting to db: ", error);
  }
})();

app.use("/api", studentRegistrationRoute);

app.get("/", (req, res) => {
  res.send("Welcome to")
});

app.listen(LOCALHOST_PORT || 3000, () => {
  console.log(`server listening on port ${LOCALHOST_PORT}`);
});















// const newDataBase = "";
// (async () => {
//   const client = await pool.connect();
//   try {
//     const createDbQuery = `CREATE DATABASE ${newDataBase}`;
//     await client.query(createDbQuery);
//     console.log(`Data base "${newDataBase}" created successfully`);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     client.release();
//   }
// })();
