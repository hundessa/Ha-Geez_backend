import express from "express";
import StudentRegistrationController from "../../../controllers/Student_Controllers/Student_Registration/StudentRegistrationController.js"

const registerRouter = express.Router();

registerRouter.post("/student-registration", StudentRegistrationController);

export default registerRouter;
