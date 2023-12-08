import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import State from "./State";
import Company from "../masters/Company";

export const Bank = sequelize.define(
  "banks",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:Company,
        key:"id"
      }
    },
    account_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    branch: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ifsc_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // city_id: {
    //   type: Sequelize.INTEGER,
    // },
    
    city:{
      type: Sequelize.STRING,
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:State,
        key:"id"
      }
    },

    status: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: true,
  }
);
Bank.belongsTo(State, { constraints: true, foreignKey: "state_id" });
Bank.belongsTo(Company, { constraints: true, foreignKey: "company_id"});
export default Bank;
