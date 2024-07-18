import express from "express";
import loginController from "../../controllers/Authentication_Controllers/loginController.js";

const loginRouter = express.Router();

loginRouter.post("/login", loginController);

export default loginRouter;
