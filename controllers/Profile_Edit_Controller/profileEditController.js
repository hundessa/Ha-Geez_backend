import asyncHandler from "../../middlewares/asyncHandler_middleware/asyncHandler.js";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";

const ProfileEditController =asyncHandler( async (req, res) => {
    const { role, email, firstname, lastname, username, phonenumber, profilepicture } = req.body;
    try {
        const existingUser = await Users.findOne({ where: { role: req.user.role, email: req.user.email } });

        if (!existingUser) {
            return res.status(200).json({ message: "Invalid User" }); // Use return to exit early
        }
         // Ensure the email and role in the request match the authenticated user
         if (req.user.email !== req.body.email || req.user.role !== req.body.role) {
            return res.status(401).json({ message: "Unauthorized to update this profile" });
        }

        const updateProfile = await Users.update({
            firstname,
            lastname,
            username,
            phonenumber,
            profilepicture
        }, { where: { role: req.user.role, email: req.user.email } });

        if (updateProfile[0] === 0) {
            return res.status(200).json({ message: "Profile update failed" }); // Use return to exit early
        }

        res.status(200).json({ message: "Profile updated successfully" });

    } catch (error) {
        console.log("error: ", error);

        // Check if response has already been sent
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error" });
        }
    }
})

export default ProfileEditController;
