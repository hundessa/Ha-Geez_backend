import bcrypt from "bcryptjs";
import Users from "../../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import { createToken } from "../../../middlewares/authentication_middleware/jwt_token.js";

const studentRegistration = async (req, res) => {

  try {
    // console.log("request: ", req.body);
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
    
    const token = createToken({ id: newUser.id, email: newUser.email, role: newUser.role });

    res.status(201).json({ message: "Account Created",  role: newUser.role, firstname: newUser.firstname, email: newUser.email , token });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default studentRegistration;
