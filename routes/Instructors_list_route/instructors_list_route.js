import express from "express";
import instructors_list_controller from "../../controllers/Instructors_list_controller/Instructors_list_controller.js";
import { admin, authProtect } from "../../middlewares/authentication_middleware/authMiddleware.js";


const instructorListRoute = express.Router();

instructorListRoute.post("/instructors-list", authProtect, admin, instructors_list_controller);

export default instructorListRoute;