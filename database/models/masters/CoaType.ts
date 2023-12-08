import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import { env } from "process";

const CoaType = sequelize.define(
  "coa_types",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sequence_number: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    // company_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references:{
    //     model:Company,
    //     key:"id"
    //   }
    // },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    module: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    remark: {
      type: Sequelize.STRING(100),
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
CoaType.addHook("beforeCreate", async (coatype:any) => {
    // Find the current prefix code from the PrefixCodes table
    const prefixCodeRow = env.COA_TYPE_CODE
    if (!prefixCodeRow) {
      throw new Error("Prefix code not found");
    }
    const prefixCode = prefixCodeRow;
    // Find the highest existing sequential number for the given prefix code
    const existingCodes:any = await CoaType.findAll({
      where: {
        sequence_number: {
          [Op.like]: `${prefixCode}%`,
        },
      },
    });
  
    if (existingCodes.length === 0) {
      // If no existing codes with the prefix code are found, start with "001"
      coatype.sequence_number = `${prefixCode}001`;
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
      coatype.sequence_number = `${prefixCode}${nextSequentialNumber}`;
    }
  });

export default CoaType;
