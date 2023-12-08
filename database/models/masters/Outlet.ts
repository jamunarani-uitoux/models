import Sequelize from "sequelize";
import { sequelize } from "../../database";
import Company from "./Company";
import Region from "../submasters/Region";
import Address from "../submasters/Address";

const Outlet = sequelize.define(
  "outlets",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Company,
        key: "id"
      }
    },
    // code: {
    //   type: Sequelize.STRING(255),
    //   allowNull: true,
    // },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    erp_code: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    ax_erp_code: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    adre_code: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    gst_number: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    region_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Region,
        key: "id"
      }
    },
    type: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    act: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    address_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Address,
        key: "id"
      }
    },


    // cost_center_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references:{
    //     model:CostCenter,
    //     key:"id"
    //   }
    // },
    // lob_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references:{
    //     model:CustomerLOB,
    //     key:"id"
    //   }
    // },
    key_user_mapping_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    shift: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    account_address_set: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    // shift_type: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // },
    shift_start_time: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    shift_end_time: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
Outlet.belongsTo(Region, { constraints: true, foreignKey: "region_id" });
Outlet.belongsTo(Address, { constraints: true, foreignKey: "address_id" });

export default Outlet;
