import sequelize from "../../configurations/sequelize";
import { DataTypes } from "sequelize";

const CourseDetail = sequelize.define("CourseDetail", {
  CourseOutCome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CourseRequirements: {
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
  CourseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  CourseLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CourseImage: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});

const CourseContent = sequelize.define("CourseContent", {
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
});
