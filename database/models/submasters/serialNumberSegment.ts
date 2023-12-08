import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import { env } from "process";
import Company from "../masters/Company";

const SerialNumberSegment = sequelize.define("serial_number_segments", {
  id: {
    type: Sequelize.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  serial_number:{
    type:Sequelize.STRING(15)
  },
  company_id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    references:{
      model:Company,
      key:"id"
    }
  },
  name: {
    type: Sequelize.STRING(255),
  },
  type: {
    type: Sequelize.STRING(255),
  },

  status: {
    type: Sequelize.BOOLEAN,
  },

  
},
{
  timestamps:true
});
SerialNumberSegment.belongsTo(Company, { constraints: true, foreignKey: "company_id"});

SerialNumberSegment.addHook("beforeCreate", async (serialNumberSegment:any) => {
  // Find the current prefix code from the PrefixCodes table
  const prefixCodeRow = env.SERIAL_NUMBER_SEGMENT
  if (!prefixCodeRow) {
    throw new Error("Prefix code not found");
  }
  const prefixCode = prefixCodeRow;
  // Find the highest existing sequential number for the given prefix code
  const existingCodes:any = await SerialNumberSegment.findAll({
    where: {
      serial_number: {
        [Op.like]: `${prefixCode}%`,
      },
    },
  });

  if (existingCodes.length === 0) {
    // If no existing codes with the prefix code are found, start with "001"
    serialNumberSegment.serial_number = `${prefixCode}001`;
  } else {
    // Find the highest existing sequential number
    const sequentialNumbers = existingCodes.map((code:any) => {
      const sequentialNumber = parseInt(
        code.serial_number.replace(prefixCode, ""),
        10
      );
      return isNaN(sequentialNumber) ? 0 : sequentialNumber;
    });

    const highestSequentialNumber = Math.max(...sequentialNumbers);

    // Format the next sequential number with leading zeros
    const nextSequentialNumber = (highestSequentialNumber + 1).toString().padStart(3, "0");

    // Generate the unique customer code
    serialNumberSegment.serial_number = `${prefixCode}${nextSequentialNumber}`;
  }
});


export default SerialNumberSegment;
