import express from "express";
import contact_Us_Controller from "../../controllers/Home_Page_Controllers/contact_Us_Controller.js"

const contactUsRouter = express.Router();

contactUsRouter.post("/contact-us", contact_Us_Controller);

export default contactUsRouter;
