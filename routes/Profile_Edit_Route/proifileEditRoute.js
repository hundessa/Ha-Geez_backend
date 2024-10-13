import express from "express"
import ProfileEditController from "../../controllers/Profile_Edit_Controller/profileEditController.js";
import {authProtect} from "../../middlewares/authentication_middleware/authMiddleware.js";


const ProfileEditRoute = express.Router();

ProfileEditRoute.post("/profile-edit", authProtect, ProfileEditController);

export default ProfileEditRoute;