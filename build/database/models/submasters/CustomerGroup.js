"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const Company_1 = __importDefault(require("../masters/Company"));
const CustomerGroup = database_1.sequelize.define("customer_group", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // serial_number:{
    //   type:Sequelize.STRING(15)
    // },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        // references: {
        //   model: Company,
        //   key: "id"
        // }
    },
    short_code: {
        type: sequelize_1.default.STRING(255),
    },
    description: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
    },
}, {
    timestamps: true
});
Company_1.default.hasMany(CustomerGroup, { constraints: true, foreignKey: "company_id" });
CustomerGroup.belongsTo(Company_1.default, { constraints: true, foreignKey: "company_id" });
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
exports.default = CustomerGroup;
