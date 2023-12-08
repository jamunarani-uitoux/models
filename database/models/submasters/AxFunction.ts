import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import { env } from "process";
import Company from "../masters/Company";
import BusinessUnit from "./BusinessUnit";
import CustomerLOB from "./CustomerLoB";
import CostCenter from "./CostCenter";

export const AxFunction = sequelize.define(
  "ax_functions",
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
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    name: {
      type: Sequelize.STRING(255),
    },
    business_unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:BusinessUnit,
          key:"id"
        }
    },
    lob_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:CustomerLOB,
          key:"id"
        }
    },
    cost_center_id: {
        type: Sequelize.STRING(255),
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
AxFunction.belongsTo(BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
AxFunction.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });
AxFunction.belongsTo(Company, { constraints: true, foreignKey: "company_id"});

AxFunction.addHook("beforeCreate", async (axFunction:any) => {
    // Find the current prefix code from the PrefixCodes table
    const prefixCodeRow = env.AX_FUNCTION_CODE
    if (!prefixCodeRow) {
      throw new Error("Prefix code not found");
    }
    const prefixCode = prefixCodeRow;
    // Find the highest existing sequential number for the given prefix code
    const existingCodes:any = await AxFunction.findAll({
      where: {
        sequence_number: {
          [Op.like]: `${prefixCode}%`,
        },
      },
    });
  
    if (existingCodes.length === 0) {
      // If no existing codes with the prefix code are found, start with "001"
      axFunction.sequence_number = `${prefixCode}001`;
    } else {
      // Find the highest existing sequential number
      const sequentialNumbers = existingCodes.map((code:any) => {
        const sequentialNumber = parseInt(
          code.sequence_number.replace(prefixCode, ""),
          10
        );
        return isNaN(sequentialNumber) ? 0 : sequentialNumber;
      });
  
      const highestSequentialNumber = Math.max(...sequentialNumbers);
  
      // Format the next sequential number with leading zeros
      const nextSequentialNumber = (highestSequentialNumber + 1).toString().padStart(3, "0");
  
      // Generate the unique customer code
      axFunction.sequence_number = `${prefixCode}${nextSequentialNumber}`;
    }
  });
  
  


export default AxFunction;
