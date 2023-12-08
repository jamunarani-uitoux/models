import Sequelize from "sequelize";
import { sequelize } from "../database";

const SalutaryInfo = sequelize.define(
  "salutaries",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default SalutaryInfo;
