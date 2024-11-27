import express from "express";
import CategoryRetrievingController from "../../controllers/Category_Creation_Controller/Category_Retrieving_Controller/categoryRetrievingController.js";
import { admin, authProtect } from "../../middlewares/authentication_middleware/authMiddleware.js";

const CategoryRetrievingRoute = express.Router();

CategoryRetrievingRoute.post("/category-list", authProtect, admin, CategoryRetrievingController);

export default CategoryRetrievingRoute;