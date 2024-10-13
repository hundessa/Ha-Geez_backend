import express from "express";
import forgot_Password_Controller from "../../controllers/Password_Recovery_Controllers/forgot_password_controller.js"
import {authProtect} from "../../middlewares/authentication_middleware/authMiddleware.js";

const forgotpasswordroute = express.Router();

forgotpasswordroute.post("/forgot-password" , authProtect, forgot_Password_Controller)

export default forgotpasswordroute;