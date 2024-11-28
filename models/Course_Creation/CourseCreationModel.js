import sequelize from "../../configurations/sequelize";
import { DataTypes } from "sequelize";
import instructorRegister from "../Instructor_Models/Instructor_Registration_Model/instructorRegisterModel";

const CourseDetailModel = sequelize.define("CourseDetail", {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  instructorId: {
    type: DataTypes.INTEGER,
    references: {
      model: instructorRegister,
      key: "id"
    }
  },
  courseOutcome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseRequirements: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IntendedLearners: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  courseDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const ModuleModel = sequelize.define("Module", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseDetailId: {
    type: DataTypes.INTEGER,
    references: {
      model: CourseDetail,
      key: "id",
    },
  },
  moduleName: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const LectureModel = sequelize.define("Lecture", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  moduleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Module,
      key: "id",
    }
  },
});

// CourseDetail to Module: One-to-Many
CourseDetailModel.hasMany(ModuleModel, {
  foreignKey: "courseDetailId",
  onDelete: "CASCADE", // Optional: Ensures child records are deleted with parent
});

ModuleModel.belongsTo(CourseDetailModel, {
  foreignKey: "courseDetailId",
});

// Module to Lecture: One-to-Many
ModuleModel.hasMany(LectureModel, {
  foreignKey: "moduleId",
  onDelete: "CASCADE",
});

LectureModel.belongsTo(ModuleModel, {
  foreignKey: "moduleId",
});



export { CourseDetailModel, ModuleModel, LectureModel }
