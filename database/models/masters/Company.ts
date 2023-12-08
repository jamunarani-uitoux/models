import Sequelize, { Op } from "sequelize";
import { sequelize } from "../../database";
import { env } from "process";
import State from "../submasters/State";

const Company = sequelize.define(
  "companies",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sequence_number: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    short_name: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },

    cin_number: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    prefix: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    gst_number: {
      type: Sequelize.STRING,
    },
    phone_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    pan_number: {
      type: Sequelize.STRING,
    },
    address_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    has_register_office: {
      type: Sequelize.BOOLEAN,
      defaultValue:true
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

Company.addHook("beforeCreate", async (company: any) => {
  // Find the current prefix code from the PrefixCodes table
  const prefixCodeRow = env.COMPANY_CODE;
  if (!prefixCodeRow) {
    throw new Error("Prefix code not found");
  }
  const prefixCode = prefixCodeRow;
  // Find the highest existing sequential number for the given prefix code
  const existingCodes: any = await Company.findAll({
    where: {
      sequence_number: {
        [Op.like]: `${prefixCode}%`,
      },
    },
  });

  if (existingCodes.length === 0) {
    // If no existing codes with the prefix code are found, start with "001"
    company.sequence_number = `${prefixCode}001`;
  } else {
    // Find the highest existing sequential number
    const sequentialNumbers = existingCodes.map((code: any) => {
      const sequentialNumber = parseInt(
        code.sequence_number.replace(prefixCode, ""),
        10
      );
      return isNaN(sequentialNumber) ? 0 : sequentialNumber;
    });

    const highestSequentialNumber = Math.max(...sequentialNumbers);

    // Format the next sequential number with leading zeros
    const nextSequentialNumber = (highestSequentialNumber + 1)
      .toString()
      .padStart(3, "0");

    // Generate the unique customer code
    company.sequence_number = `${prefixCode}${nextSequentialNumber}`;
  }
});

export default Company;
