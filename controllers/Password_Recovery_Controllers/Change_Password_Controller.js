import bcrypt from "bcryptjs";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";


const Change_Password_Controller = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("Generated hashed password:", hashedPassword);

    let user = await Users.findOne({ where: { email } });
    console.log("User found:", user);

    if (user) {
      // console.log("Stored password:", user.password);
      // console.log("Current password:", currentPassword); // Log current password for debugging
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      // console.log("Student current password match:", isMatch);

      if (isMatch) {
        await Users.update(
          { password: hashedPassword },
          { where: { email } }
        );
        return res.status(200).json({ message: "Password changed successfully" });
      } else {
        return res.status(200).json({ message: "Current password doesn't match" });
      }
    } 
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Server error", err });
  }

  
};

export default Change_Password_Controller;
