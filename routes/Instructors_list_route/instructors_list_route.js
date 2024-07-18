import express from "express";
import instructors_list_controller from "../../controllers/Instructors_list_controller/Instructors_list_controller.js";


const instructorListRoute = express.Router();

instructorListRoute.post("/instructors-list", instructors_list_controller);

export default instructorListRoute;