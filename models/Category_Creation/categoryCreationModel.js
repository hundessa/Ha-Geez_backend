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
            type: DataTypes.BLOB,
            allowNull: false
        }
    }
);


export default CategoryCreationModel;