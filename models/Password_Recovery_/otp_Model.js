import {DataTypes} from "sequelize";
import sequelize from "../../configurations/sequelize.js";


const OTP = sequelize.define(
    "OTP",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        otp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expiresAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
    },
    {
        timestamps: true,
      }
)

export default OTP;