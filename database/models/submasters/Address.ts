import Sequelize from "sequelize";
import { sequelize } from "../../database";
import State from "./State";
import Region from "./Region";
import Country from "./Country";
import City from "./City";
import District from "./District";

const Address = sequelize.define(
  "addresses",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    line_1: {
      type: Sequelize.STRING,
    },
    line_2: {
      type: Sequelize.STRING,
    },
    line_3: {
      type: Sequelize.STRING,
    },
    city_id: {
      type: Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:City,
        key:"id",
      }
    },
    district_id: {
      type: Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:District,
        key:"id",
      }
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:State,
        key:"id"
      }
    },
    region_id: {
      type: Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:Region,
        key:"id"
      }
    },
    country_id: {
      type: Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:Country,
        key:"id"
      }
    },
    pin_code: {
      type: Sequelize.INTEGER,
      // allowNull: true,
    },
    address_set: {
      type: Sequelize.TEXT,
    },
    entity_type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue:1
    },
  },
  {
    timestamps:true
  }

);
Address.belongsTo(State,{constraints:true, foreignKey:"state_id"});
Address.belongsTo(Region,{constraints:true, foreignKey:"region_id"});
Address.belongsTo(Country,{constraints:true, foreignKey:"country_id"});
Address.belongsTo(City,{constraints:true, foreignKey:"city_id"});
Address.belongsTo(District,{constraints:true, foreignKey:"district_id"});

export default Address;
