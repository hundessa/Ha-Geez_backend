import express from "express"
import ProfileEditController from "../../controllers/Profile_Edit_Controller/profileEditController.js";


const ProfileEditRoute = express.Router();

ProfileEditRoute.post("/profile-edit", ProfileEditController);

export default ProfileEditRoute;