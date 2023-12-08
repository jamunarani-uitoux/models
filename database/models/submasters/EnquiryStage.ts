import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, EnumeratedValue,CustomerLOB} from "../index"

export const EnquiryStage = sequelize.define(
  "enquiry_stage",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER(),
      allowNull: false
    },
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    lob_id: {
      type: Sequelize.INTEGER(),
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
      beforeValidate: async (enquiry_type: any) => {
        if (!enquiry_type.sequence_number) {
          const lastLob = await EnquiryStage.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastLob) {
            
            const lastId = lastLob.sequence_number;
            const numericPart = parseInt(lastId.slice(4), 10);

            const newId = `ENQS${(numericPart + 1).toString().padStart(3, "0")}`;
            enquiry_type.sequence_number = newId;
          } else {
            enquiry_type.sequence_number = "ENQS001";
          }
        }
      },
    },
    timestamps: true,
  }
);
Company.hasMany(EnquiryStage, { constraints: true, foreignKey: "company_id" });
EnquiryStage.belongsTo(Company, { constraints: true, foreignKey: "company_id" });

CustomerLOB.hasMany(EnquiryStage, { constraints: true, foreignKey: "lob_id" });
EnquiryStage.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });

 
export default EnquiryStage;
