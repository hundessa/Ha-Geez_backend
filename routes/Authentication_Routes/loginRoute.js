import express from "express";
import {login, logoutUser } from '../../controllers/Authentication_Controllers/loginController.js'

const loginRouter = express.Router();

loginRouter.post("/login", login);
loginRouter.post('/logout', logoutUser);

export default loginRouter;
