import { SMTPClient } from 'emailjs';
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
import OTP from "../../models/Password_Recovery_/otp_Model.js";
import {EMAIL, EMAIL_PASSWORD, sessionSecret} from "../../configurations/config.js"
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js"
// const OAuth2 = google.auth.OAuth2;

dotenv.config();


const generateOTP = (length = 6) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};


const sendOTP = async (req, res) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (!user) {
      return res.status(400).json({ message: "Email not found" });
  }

  const client = new SMTPClient({
    user: EMAIL,
    password: EMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: true,
  });

  try {
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 25 * 60 * 1000); // 25 minutes

    await client.sendAsync({
      text: `Your OTP is ${otp}`,
      from: EMAIL,
      to: email,
      subject: 'Password Reset OTP',
    });

    console.log('Message sent:', otp);

    await OTP.upsert({ email, otp, expiresAt });

    req.session.email = email; // Store email in session
    console.log('Session after setting email:', req.session);
    res.status(200).json({ message: 'OTP sent to email', otp });

  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};





const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const email = req.session.email;
console.log("session secret: ", sessionSecret);
  if (!email) {
    return res.status(200).json({ message: "Session expired. Please try again." });
  }

  try {
    const otpInt = parseInt(otp, 10);
    const record = await OTP.findOne({ where: { otp: otpInt } });

    if (!record) {
      return res.status(200).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(200).json({ message: "Expired OTP" });
    }

    req.session.otpVerified = true;
    return res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export default verifyOTP;

  
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const email = req.session.email;
  
  if (!email || !req.session.otpVerified) {
    return res.status(200).json({ message: "Unauthorized request" });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    const user = await Users.findOne({ where: { email } });
    if (user) {
      await Users.update({ password: hashedPassword }, { where: { email } });
    } else {
      return res.status(200).json({ message: "Email not found" });
    }
  
    await OTP.destroy({ where: { email } });
  
    // Clear session data
    req.session.email = null;
    req.session.otpVerified = null;
  
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
    


export { generateOTP, sendOTP, verifyOTP, resetPassword };
