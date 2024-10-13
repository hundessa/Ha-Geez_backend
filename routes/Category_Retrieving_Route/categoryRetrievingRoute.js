import express from "express";
import CategoryRetrievingController from "../../controllers/Category_Creation_Controller/Category_Retrieving_Controller/categoryRetrievingController.js";
import { admin } from "../../middlewares/authentication_middleware/authMiddleware.js";

const CategoryRetrievingRoute = express.Router();

CategoryRetrievingRoute.post("/category-list", admin, CategoryRetrievingController);

export default CategoryRetrievingRoute;