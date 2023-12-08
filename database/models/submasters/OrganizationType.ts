import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import { env } from "process";

const OrganizationType = sequelize.define("organization_type", {
  id: {
    type: Sequelize.INTEGER(),
    primaryKey: true,
    autoIncrement: true,
  },
  sequence_number: {
    type: Sequelize.STRING(255),
  },
  name: {
    type: Sequelize.STRING(255),
  },
  pan_fourth_ref_code: {
    type: Sequelize.STRING(255),
  },
  description: {
    type: Sequelize.STRING(255),
  },
  status: {
    type: Sequelize.BOOLEAN,
  },
});
OrganizationType.addHook( "beforeValidate", (value:any)=>{
    // console.log(value.pan_fourth_ref_code);
    // const check:any= OrganizationType.findAll({where:{pan_fourth_ref_code:value.pan_fourth_ref_code}});
    // if(check.length >0){
    //   throw Error("pan fourth letter already exist");
    // }
    
})

OrganizationType.addHook("beforeCreate", async (organizationType:any) => {
  // Find the current prefix code from the PrefixCodes table
  const prefixCodeRow = env.ORGANIZATION_TYPE_CODE
  if (!prefixCodeRow) {
    throw new Error("Prefix code not found");
  }
  const prefixCode = prefixCodeRow;
  // Find the highest existing sequential number for the given prefix code
  const existingCodes:any = await OrganizationType.findAll({
    where: {
      sequence_number: {
        [Op.like]: `${prefixCode}%`,
      },
    },
  });

  if (existingCodes.length === 0) {
    // If no existing codes with the prefix code are found, start with "001"
    organizationType.sequence_number = `${prefixCode}001`;
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
    organizationType.sequence_number = `${prefixCode}${nextSequentialNumber}`;
  }
});
export default OrganizationType;
