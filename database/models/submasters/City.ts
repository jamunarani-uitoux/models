import Sequelize from "sequelize";
import { sequelize } from "../../database";
import {District,Country } from "../index";


export const City = sequelize.define(
  "city",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull:false
    },
    district_id: {
        type: Sequelize.INTEGER,
      },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

District.hasMany(City,{constraints:true,foreignKey:"district_id"})
City.belongsTo(District,{constraints:true,foreignKey:"district_id"})

export default City;
