import jwt from "jsonwebtoken";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import asyncHandler from "../asyncHandler_middleware/asyncHandler.js";
import { accesstokensecret } from "../../configurations/config.js";


const authProtect = asyncHandler(async (req, res, next) => {
  console.log("Auth middleware executed");

  let token = req.cookies.jwt;
  console.log('Token:', token);

  if (token) {
    try {
      const decoded = jwt.verify(token, accesstokensecret);
      req.user = await Users.findOne({
        where: { id: decoded.id },
        attributes: { exclude: ["password"] },
      });

      console.log("Decoded Token:", decoded);
      console.log("User found:", req.user);
      
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

// const authProtect = asyncHandler(async (req, res, next) => {
//   console.log("Auth middleware executed");

//   const token = req.cookies.jwt;  // Get token from cookies
//   console.log('Token:', token);

//   if (!token) {
//       return res.status(401).json({ message: "Not authorized, no token" });
//   }

//   try {
//       const decoded = jwt.verify(token, accesstokensecret);
//       req.user = await Users.findOne({
//           where: { id: decoded.id },
//           attributes: { exclude: ["password"] },
//       });

//       if (!req.user) {
//           console.log("User not found with the given ID:", decoded.id);
//           return res.status(401).json({ message: "User not found" });
//       }

//       console.log("Decoded Token:", decoded);
//       console.log("User found:", req.user);
//       next();
//   } catch (error) {
//       console.error("Token verification error:", error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//   }
// });


//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as admin" });
  }
};

export { authProtect, admin };
