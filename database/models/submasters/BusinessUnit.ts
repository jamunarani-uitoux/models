import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

export const BusinessUnit = sequelize.define(
  "business_unit",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING(11),
    },
    name: {
      type: Sequelize.STRING(255),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    /*  hooks: {
      beforeValidate: async (sub_aggregate: any) => {
        if (!sub_aggregate.sub_aggregate_sequence_number) {
          const lastLob = await SubAggregate.findOne({
            order: [["sub_aggregate_sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sub_aggregate_sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `SAG${(numericPart + 1).toString().padStart(3, "0")}`;
            sub_aggregate.sub_aggregate_sequence_number = newId;
          } else {
            sub_aggregate.sub_aggregate_sequence_number = "SAG001";
          }
        }
      },
    }, */
    timestamps: true,
  }
);
Company.hasMany(BusinessUnit, {constraints: true,foreignKey: "company_id"});
BusinessUnit.belongsTo(Company, {constraints: true,foreignKey: "company_id"});
export default BusinessUnit;
