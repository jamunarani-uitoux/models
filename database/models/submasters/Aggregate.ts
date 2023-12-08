import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

export const Aggregate = sequelize.define(
  "aggregate",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER(),
    },
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    detail: {
      type: Sequelize.STRING(11),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeValidate: async (aggregate: any) => {
        if (!aggregate.sequence_number) {
          const lastLob = await Aggregate.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `AGG${(numericPart + 1).toString().padStart(3, "0")}`;
            aggregate.sequence_number = newId;
          } else {
            aggregate.sequence_number = "AGG001";
          }
        }
      },
    },
    timestamps: true,
  }
);
Company.hasMany(Aggregate, {constraints: true,foreignKey: "company_id"});
Aggregate.belongsTo(Company, {constraints: true,foreignKey: "company_id"});
export default Aggregate;
