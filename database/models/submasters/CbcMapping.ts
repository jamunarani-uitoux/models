import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company,BusinessUnit,CustomerLOB} from "../index"

const CbcMapping = sequelize.define(
  "cbc_mapping",
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
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    business_unit_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lob_id: {
      type: Sequelize.INTEGER(),
      allowNull: false,
    },
    cost_center_id: {
      type: Sequelize.STRING(255),
      allowNull: false,
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
    hooks: {
      /*   beforeCreate: async (cbc_mapping: any) => {
        if (!cbc_mapping.cbc_mapping_sequence_number) {
          const lastLob = await CbcMapping.findOne({
            order: [["cbc_mapping_sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.cbc_mapping_sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `CBC${(numericPart + 1).toString().padStart(3, "0")}`;
            cbc_mapping.cbc_mapping_sequence_number = newId;
          } else {
            cbc_mapping.cbc_mapping_sequence_number = "CBC001";
          }
        }
      }, */
      beforeUpdate: async (cost_center: any, instance: any) => {},
    },
    timestamps: true,
  }
);
Company.hasMany(CbcMapping, { constraints: true, foreignKey: "company_id" });
CbcMapping.belongsTo(Company, {constraints: true,foreignKey: "company_id",});
BusinessUnit.hasMany(CbcMapping, {constraints: true,foreignKey: "business_unit_id",});
CbcMapping.belongsTo(BusinessUnit, {constraints: true,foreignKey: "business_unit_id",});
CustomerLOB.hasMany(CbcMapping, { constraints: true, foreignKey: "lob_id" });
CbcMapping.belongsTo(CustomerLOB, {constraints: true,foreignKey: "lob_id",});
export default CbcMapping;
