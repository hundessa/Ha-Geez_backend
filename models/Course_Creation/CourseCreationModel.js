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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Module = sequelize.define("Module", {
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

const Lecture = sequelize.define("Lecture", {
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

Module.hasMany(Lecture, {
  foreignKey: 'moduleId',
});

Lecture.belongsTo(Module, {
  foreignKey: 'moduleId'
});


export { CourseDetail, Module, Lecture }
