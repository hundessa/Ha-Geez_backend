import { DataTypes } from "sequelize";
import sequelize from "../../../configurations/sequelize.js";
import Users from "../../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";

// Define the instructorRegister model
const instructorRegister = sequelize.define("InstructorRegister", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,  
      key: "id",
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  levelofeducation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fieldofstudy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  professionalcertificate: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  yearsofexperiance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
instructorRegister.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

export default instructorRegister;
