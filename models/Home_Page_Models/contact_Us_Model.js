import { DataTypes } from "sequelize";
import sequelize from "../../configurations/sequelize.js"

const Contact_Us = sequelize.define("Contact_Us", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Contact_Us;