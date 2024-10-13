import bcrypt from "bcryptjs";
import  generateToken  from "../../utils/generateToken.js";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import asyncHandler from "../../middlewares/asyncHandler_middleware/asyncHandler.js";

const login = asyncHandler( async (req, res) => {
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
    
    generateToken(res, user);

    res.status(200).json({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    })


  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully'})
  });

export { login, logoutUser }