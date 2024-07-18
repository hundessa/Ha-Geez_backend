import express from "express";
import instructorRegisterController from "../../../controllers/Instructor_Controllers/Instructor_Registration_Controller/instructorRegisterController.js";

const instructorRegisterRouter = express.Router();

instructorRegisterRouter.post(
  "/instructor-registration",
  instructorRegisterController
);

export default instructorRegisterRouter;
