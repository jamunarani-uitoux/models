import Sequelize from "sequelize";
import { sequelize } from "../database";
import State from "./submasters/State";
import City from "./submasters/City";

const BankDetails = sequelize.define(
  "bank_detail",
  {
    account_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
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
    cheque_leaf_attachment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    file_original_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city:{
      type: Sequelize.STRING,
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      // references:{
      //   model:State,
      //   key:"id"
      // }
    },
    entity_type: {
      type: Sequelize.STRING,
    },
  }
);
State.hasMany(BankDetails, { constraints: true, foreignKey: "state_id" });
BankDetails.belongsTo(State, {constraints: true,foreignKey: "state_id" });
export default BankDetails;
