import Sequelize from "sequelize";
import { sequelize } from "../../database";
import {State } from "../index";


export const District = sequelize.define(
  "district",
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
    state_id: {
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
State.hasMany(District,{constraints:true,foreignKey:"state_id"})
District.belongsTo(State,{constraints:true,foreignKey:"state_id"})
export default District;
