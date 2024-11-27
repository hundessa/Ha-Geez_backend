import express from "express";
import CategoryCreationController from "../../controllers/Category_Creation_Controller/categoryCreationController.js";
import { admin, authProtect } from "../../middlewares/authentication_middleware/authMiddleware.js";

const CategoryCreationRoute = express.Router();

CategoryCreationRoute.post("/category-creation", authProtect, admin, CategoryCreationController);

export default CategoryCreationRoute;