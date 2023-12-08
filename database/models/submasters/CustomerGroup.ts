import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import { env } from "process";
import Company from "../masters/Company";

const CustomerGroup = sequelize.define("customer_group",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
    // serial_number:{
    //   type:Sequelize.STRING(15)
    // },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: Company,
      //   key: "id"
      // }
    },
    short_code: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.STRING(255),
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: true
  }
);
Company.hasMany(CustomerGroup, { constraints: true, foreignKey: "company_id" });
CustomerGroup.belongsTo(Company, {constraints: true,foreignKey: "company_id"});
// CustomerGroup.addHook("beforeCreate", async (customerGroup:any) => {
//   // Find the current prefix code from the PrefixCodes table
//   const prefixCodeRow = env.CUSTOMER_GROUP_CODE
//   if (!prefixCodeRow) {
//     throw new Error("Prefix code not found");
//   }
//   const prefixCode = prefixCodeRow;
//   // Find the highest existing sequential number for the given prefix code
//   const existingCodes:any = await CustomerGroup.findAll({
//     where: {
//       serial_number: {
//         [Op.like]: `${prefixCode}%`,
//       },
//     },
//   });

//   if (existingCodes.length === 0) {
//     // If no existing codes with the prefix code are found, start with "001"
//     customerGroup.serial_number = `${prefixCode}001`;
//   } else {
//     // Find the highest existing sequential number
//     const sequentialNumbers = existingCodes.map((code:any) => {
//       const sequentialNumber = parseInt(
//         code.serial_number.replace(prefixCode, ""),
//         10
//       );
//       return isNaN(sequentialNumber) ? 0 : sequentialNumber;
//     });
//     const highestSequentialNumber = Math.max(...sequentialNumbers);
//     // Format the next sequential number with leading zeros
//     const nextSequentialNumber = (highestSequentialNumber + 1).toString().padStart(3, "0");
//     // Generate the unique customer code
//     customerGroup.serial_number = `${prefixCode}${nextSequentialNumber}`;
//   }
// });
export default CustomerGroup;
