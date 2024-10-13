import express from "express";
import Change_Password_Controller from "../../controllers/Password_Recovery_Controllers/Change_Password_Controller.js";
import {authProtect} from "../../middlewares/authentication_middleware/authMiddleware.js";


const ChangePasswordRoute = express.Router();

 ChangePasswordRoute.post("/change-password", authProtect, Change_Password_Controller);

 export default ChangePasswordRoute;