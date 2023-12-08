import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, BusinessUnit} from "../index"

const CustomerLOB = sequelize.define(
  "lob",
  {
    id: {
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    business_unit_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sequence_no: {
      type: Sequelize.STRING(255),
    },
    parent_code: {
      type: Sequelize.STRING(255),
    },
    parent_description: {
      type: Sequelize.TEXT,
    },
    child_code: {
      type: Sequelize.STRING(255),
    },
    child_description: {
      type: Sequelize.TEXT,
    },
    full_description: {
      type: Sequelize.TEXT,
    },
    ax_function: {
      type: Sequelize.STRING(255),
    },
    // cost_center_id: {
    //   type: Sequelize.STRING(255),
    //   allowNull: false,
    // },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeValidate: async (lob: any) => {
        if (!lob.sequence_no) {
          const lastLob = await CustomerLOB.findOne({
            order: [["sequence_no", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sequence_no;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `LOB${(numericPart + 1).toString().padStart(3, "0")}`;
            lob.sequence_no = newId;
          } else {
            lob.sequence_no = "LOB001";
          }
        }
      },
    },
    timestamps: true,
  }
);
BusinessUnit.hasMany(CustomerLOB,{constraints: true, foreignKey: "business_unit_id"})
CustomerLOB.belongsTo(BusinessUnit,{constraints:true, foreignKey:"business_unit_id"});
Company.hasMany(CustomerLOB, { constraints: true, foreignKey: "company_id" });
CustomerLOB.belongsTo(Company, {constraints: true,foreignKey: "company_id"});
export default CustomerLOB;
