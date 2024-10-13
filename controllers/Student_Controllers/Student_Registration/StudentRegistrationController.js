import bcrypt from "bcryptjs";
import Users from "../../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import generateToken  from "../../../utils/generateToken.js";
import asyncHandler from "../../../middlewares/asyncHandler_middleware/asyncHandler.js";

const studentRegistration = asyncHandler( async (req, res) => {

  try {

    const { firstname, lastname, username, email, phonenumber, password, role } = req.body;
    

    const user = await Users.findOne({ where: { email } });

    if (user) {
      return res.status(200).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      firstname,
      lastname,
      username,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });
    
    if (newUser) {
      generateToken(res, newUser.id, newUser.email);
      res.status(201).json({
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        phonenumber: newUser.phonenumber,
        role: newUser.role,
      })
    }

  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default studentRegistration;
