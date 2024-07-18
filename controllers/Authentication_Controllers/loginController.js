import bcrypt from "bcrypt";
import { createToken } from "../../middlewares/authentication_middleware/jwt_token.js";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ message: "Incorrect Password" });
    }

    const accessToken = createToken(user); // Assuming createToken returns a valid token

    const { role, firstname, lastname, username, phonenumber } = user;
    return res.status(200).json({ message: "Success", accessToken, role, firstname, email, lastname, username, phonenumber });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default login;

