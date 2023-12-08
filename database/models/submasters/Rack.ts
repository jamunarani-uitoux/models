import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import Company from "../masters/Company";
import { env } from "process";

export const Rack=sequelize.define("racks",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    company_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:Company,
            key:"id"
        }
    },
    sequence_number:{
        type:Sequelize.STRING(255),
    },
    location:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    type:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    name:{
        type:Sequelize.STRING(255),
        allowNull:false
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:1
    }

});
Rack.belongsTo(Company,{constraints:true, foreignKey:"company_id"});
Rack.addHook("beforeCreate", async (rack:any) => {
    // Find the current prefix code from the PrefixCodes table
    const prefixCodeRow = env.RACK_CODE
    if (!prefixCodeRow) {
      throw new Error("Prefix code not found");
    }
    const prefixCode = prefixCodeRow;
    // Find the highest existing sequential number for the given prefix code
    const existingCodes:any = await Rack.findAll({
      where: {
        sequence_number: {
          [Op.like]: `${prefixCode}%`,
        },
      },
    });
  
    if (existingCodes.length === 0) {
      // If no existing codes with the prefix code are found, start with "001"
      rack.sequence_number = `${prefixCode}001`;
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
      rack.sequence_number = `${prefixCode}${nextSequentialNumber}`;
    }
  });

export default Rack;
