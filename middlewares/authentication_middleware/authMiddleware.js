import jwt from "jsonwebtoken";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import asyncHandler from "../asyncHandler_middleware/asyncHandler.js";
import { accesstokensecret } from "../../configurations/config.js";



const authProtect = asyncHandler(async (req, res, next) => {
  console.log("Cookies in request:", req.cookies); // Debug cookies here
  const token = req.cookies.jwt; // Extract the cookie
  console.log("Extracted token:", token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, accesstokensecret);
    req.user = await Users.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
});



//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as admin" });
  }
};

export { authProtect, admin };
