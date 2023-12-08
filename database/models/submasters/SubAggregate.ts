import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company,Aggregate} from "../index"

export const SubAggregate = sequelize.define(
  "sub_aggregate",
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
    aggregate_id: {
      type: Sequelize.INTEGER(),
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
      beforeValidate: async (sub_aggregate: any) => {
        if (!sub_aggregate.sequence_number) {
          const lastLob = await SubAggregate.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `SAG${(numericPart + 1).toString().padStart(3, "0")}`;
            sub_aggregate.sequence_number = newId;
          } else {
            sub_aggregate.sequence_number = "SAG001";
          }
        }
      },
    },
    timestamps: true,
  }
);
Company.hasMany(SubAggregate, {constraints: true,foreignKey: "company_id",});
SubAggregate.belongsTo(Company, {constraints: true,foreignKey: "company_id",});
Aggregate.hasMany(SubAggregate, {constraints: true,foreignKey: "aggregate_id",});
SubAggregate.belongsTo(Aggregate, {constraints: true,foreignKey: "aggregate_id",});
export default SubAggregate;
