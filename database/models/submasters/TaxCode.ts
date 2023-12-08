import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Tax,State,EnumeratedValue} from "../index"


export const TaxCode = sequelize.define(
  "tax_code",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    number: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    tax_code_types: {
      type: Sequelize.STRING(),
    },
    tax_id: {
      type: Sequelize.INTEGER(),
    },
    percentage: {
      type: Sequelize.DECIMAL(),
    },
    state_id: {
      type: Sequelize.INTEGER(),
    },
status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeValidate: async (tax_code: any) => {
        if (!tax_code.sequence_number) {
          const lastLob = await TaxCode.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `TCO${(numericPart + 1).toString().padStart(3, "0")}`;
            tax_code.sequence_number = newId;
          } else {
            tax_code.sequence_number = "TCO001";
          }
        }
      },
    },
    timestamps: true,
  }
);
Tax.hasMany(TaxCode, {
  constraints: true,
  foreignKey: "tax_id",
});
TaxCode.belongsTo(Tax, {
  constraints: true,
  foreignKey: "tax_id",
});

State.hasMany(TaxCode, {
  constraints: true,
  foreignKey: "state_id",
});
TaxCode.belongsTo(State, {
  constraints: true,
  foreignKey: "state_id",
});

// EnumeratedValue.hasMany(TaxCode, {
//   constraints: true,
//   foreignKey: "tax_code_types",
// });
// TaxCode.belongsTo(EnumeratedValue, {
//   constraints: true,
//   foreignKey: "tax_code_types",
// });
export default TaxCode;
