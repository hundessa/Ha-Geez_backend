import express from "express";
import CategoryRetrievingController from "../../../controllers/Category_Creation_Controller/Category_Retrieving_Controller/categoryRetrievingController.js";

const CategoryRetrievingRoute = express.Router();

CategoryRetrievingRoute.post("/category-list", CategoryRetrievingController);

export default CategoryRetrievingRoute;