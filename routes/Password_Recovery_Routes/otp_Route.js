import express from "express";
import {sendOTP, verifyOTP, resetPassword} from "../../controllers/Password_Recovery_Controllers/otp_Controller.js"
import {authProtect} from "../../middlewares/authentication_middleware/authMiddleware.js";

const otpRoute = express.Router();

otpRoute.post("/send-otp", authProtect, sendOTP);
otpRoute.post('/verify-otp', authProtect, verifyOTP);
otpRoute.post("/reset-password", authProtect, resetPassword);


export default otpRoute;