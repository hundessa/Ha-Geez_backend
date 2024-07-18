import express from "express"
import students_list_controller from "../../controllers/Students_list_controller/students_list_controller.js";

const students_list_route = express.Router();

students_list_route.post("/students-list", students_list_controller);

export default students_list_route;