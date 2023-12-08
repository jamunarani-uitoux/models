import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company,Country,State } from "../index";
export const Region = sequelize.define(
  "region",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING(255),
    },
    name: {
      type: Sequelize.STRING(255),
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    country_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      // beforeValidate: async (region: any) => {
      //   if (!region.code) {
      //     const lastState = await State.findOne({
      //       where: { id: region.state_id },
      //     });          
      //     if (lastState) {
      //       const lastLob = await Region.findOne({
      //         where: { state_id: region.state_id },
      //         order: [["id", "DESC"]],
      //       });
      //       if (lastLob) {
      //         const lastId = lastLob.code;
      //         const numericPart = parseInt(lastId.slice(2), 10);
      //         const newId = `${lastState.dataValues.code}${(
      //           numericPart + 1
      //         )
      //           .toString()
      //           .padStart(1, "0")}`;
      //         region.code = newId;
      //       } else {
      //         const stateId = lastState.dataValues.code;
      //         region.code = `${stateId}1`;
      //       }
      //     }
      //   }
      // },
      beforeUpdate: async (region: any, instance: any) => {},
    },
    timestamps: true,
  }
);
Company.hasMany(Region, { constraints: true, foreignKey: "company_id" });
Region.belongsTo(Company, { constraints: true, foreignKey: "company_id" });
State.hasMany(Region, { constraints: true, foreignKey: "state_id" });
Region.belongsTo(State, { constraints: true, foreignKey: "state_id" });
Country.hasMany(Region, { constraints: true, foreignKey: "country_id" });
Region.belongsTo(Country, { constraints: true, foreignKey: "country_id" });
export default Region;
