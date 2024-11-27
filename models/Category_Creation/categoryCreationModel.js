import sequelize from "../../configurations/sequelize.js";
import { DataTypes } from "sequelize";


const CategoryCreationModel = sequelize.define(
    "Category",
    {
       categoryName: {
             type: DataTypes.STRING,
             allowNull: false,
             unique: true
        },
        categoryDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryImage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Active"
        }
    }
);


export default CategoryCreationModel;