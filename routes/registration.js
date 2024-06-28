import express from "express";
import registration from "../controllers/registration.js"


const router = express.Router();

router.post("/register", registration)

export default router;