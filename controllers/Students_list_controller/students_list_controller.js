import sequelize from "../../configurations/sequelize.js";
import asyncHandler from "../../middlewares/asyncHandler_middleware/asyncHandler.js";
import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js"


const students_list_controller =asyncHandler( async (req, res) =>{
    const { role } = req.body;

 // Ensure the email and role in the request match the authenticated user
//  if (req.user.email !== req.body.email || req.user.role !== req.body.role) {
//     return res.status(401).json({ message: "Unauthorized to update this profile" });
// }

if (role !== "Student") {
    return res.status(200).json({ message: "Invalid role"});
}

try {
// const students = await Users.findAll({ where: {role: 'Student'}});

// Fetch student data using a raw SQL query
const students = await sequelize.query(
    'SELECT * FROM "Users" WHERE role = :role',
    {
      replacements: { role: "Student" }, // Use replacements to prevent SQL injection
      type: sequelize.QueryTypes.SELECT, // Run as SELECT query
    }
  );

if (!students || students.length === 0) {
    return res.status(404).json({ message: "No students found" });
  }

  // Log to debug
  console.log("Fetched students:", students);

const studentsDetails = students.map((stud) => ({
    id: stud.id,
    firstname: stud.firstname,
    lastname: stud.lastname,
    email: stud.email,
    username: stud.username,
    phonenumber: stud.phonenumber,
}))

    return res.status(200).json({ studentsDetails });
}
catch(err){
    console.log("Error fetching students: ", err);
    return res.status(500).json({ message: "Server error" });
}
})

export default students_list_controller;