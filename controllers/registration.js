import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// const app = express();

// app.use(express.json());

// const registration = () =>{

// app.post("/register", async (req, res) => {
//   const { firstname, lastname, username, email, phonenumber, password } =
//     req.body;
//   try {
//     const user = await User.findOne({where: {email} });

//     if (user) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User.create({
//       firstname,
//       lastname,
//       username,
//       email,
//       phonenumber,
//       password: hashedPassword,
//     });

//     // await newUser.save();
//     res.status(201).json({ message: "Account Created" });
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);
//   res.status(500).json({ message: "Internal server error" });
// });
// }

const registration = async (req, res) => {
  const { firstname, lastname, username, email, phonenumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      phonenumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Account Created" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default registration;