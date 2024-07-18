// import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js"

// const forgotpassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await Users.findOne({ where: { email } });
//     if (!user) {
//       return res.status(200).json({ message: "Email not found" });
//     } else {
//       return res.status(200).json({ message: "Account found" });
//     }
//   } catch (error) {
//     console.error("Error in forgotpassword:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export default forgotpassword;


import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";

const forgotpassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ message: "Email not found" });
    } else {
      return res.status(200).json({ message: "Account found" });
    }
  } catch (error) {
    console.error("Error in forgotpassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default forgotpassword;
