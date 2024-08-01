import { DataTypes } from "sequelize";
import sequelize from "../../../configurations/sequelize.js";
import Roles from "../../../helpers/Roles.js"

const Users = sequelize.define("User", {
  // Define your User model attributes here
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilepicture: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: Roles.Student, 
  },
});

export default Users;
