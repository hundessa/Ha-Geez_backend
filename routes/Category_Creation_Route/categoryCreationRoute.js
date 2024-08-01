import express from "express";
import CategoryCreationController from "../../controllers/Category_Creation_Controller/categoryCreationController.js";

const CategoryCreationRoute = express.Router();

CategoryCreationRoute.post("/category-creation", CategoryCreationController);

export default CategoryCreationRoute;