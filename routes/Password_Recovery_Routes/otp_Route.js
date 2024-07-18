import express from "express";
import {sendOTP, verifyOTP, resetPassword} from "../../controllers/Password_Recovery_Controllers/otp_Controller.js"

const otpRoute = express.Router();

otpRoute.post("/send-otp", sendOTP);
otpRoute.post('/verify-otp', verifyOTP);
otpRoute.post("/reset-password", resetPassword);


export default otpRoute;