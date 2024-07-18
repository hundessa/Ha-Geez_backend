import express from "express";
import Change_Password_Controller from "../../controllers/Password_Recovery_Controllers/Change_Password_Controller.js";

const ChangePasswordRoute = express.Router();

 ChangePasswordRoute.post("/change-password", Change_Password_Controller);

 export default ChangePasswordRoute;