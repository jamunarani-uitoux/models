import Sequelize from "sequelize";
import { sequelize } from "../../database";
import {EnumeratedValue} from "../index"
export const Tax = sequelize.define(
  "taxes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tax_type: {
      type: Sequelize.STRING(),
    },

    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeValidate: async (tax: any) => {
        if (!tax.sequence_number) {
          const lastLob = await Tax.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `TAX${(numericPart + 1).toString().padStart(3, "0")}`;
            tax.sequence_number = newId;
          } else {
            tax.sequence_number = "TAX001";
          }
        }
      },
    },
    timestamps: true,
  }
);
// EnumeratedValue.hasMany(Tax, {
//   constraints: true,
//   foreignKey: "tax_type",
// });
// Tax.belongsTo(EnumeratedValue, {
//   constraints: true,
//   foreignKey: "tax_type",
// });

export default Tax;
