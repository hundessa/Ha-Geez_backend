import express from "express"
import { authProtect, admin } from "../../middlewares/authentication_middleware/authMiddleware.js"
import getUserData from "../../controllers/Get_Users_Data/getUsersData.js";

const getUserDataRoute = express.Router();

getUserDataRoute.get("/auth", authProtect, getUserData);

export default getUserDataRoute;