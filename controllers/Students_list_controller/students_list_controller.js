import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js"


const students_list_controller = async (req, res) =>{
const { role } = req.body;

if ( role !== "Student"){
  return  res.status(400).json({ message: "Invalid role"})
}
try {
    const students = await Users.findAll({ where: {role}, attributes: ['firstname', 'lastname', 'email']});

    return res.status(200).json({ students });
}
catch(err){
    console.log("Error fetching students: ", err);
    return res.status(500).json({ message: "Server error" });
}
}

export default students_list_controller;