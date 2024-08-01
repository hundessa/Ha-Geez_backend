import sequelize from "../../configurations/sequelize.js";

const instructor_list_controller = async (req, res) => {
  const { role } = req.body;

  if (role !== "Instructor") {
    return res.status(200).json({ message: "Invalid role" });
  }

  try {
    // Using Sequelize's query syntax to join Users and InstructorRegisters
    const instructors = await sequelize.query(
      'SELECT * FROM "Users" users join "InstructorRegisters" inst on users.email = inst.email',
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const instructorDetails = instructors.map((inst) => ({
      id: inst.id,
      firstname: inst.firstname,
      lastname: inst.lastname,
      email: inst.email,
      username: inst.username,
      phonenumber: inst.phonenumber,
      levelofeducation: inst.levelofeducation,
      fieldofstudy: inst.fieldofstudy,
      yearsofexperiance: inst.yearsofexperiance,
      professionalcertificate: inst.professionalcertificate,
    }));

    return res.status(200).json({ instructorDetails });
  } catch (error) {
    console.log("Error fetching instructors: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default instructor_list_controller;
