import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, EnumeratedValue,CustomerLOB} from "../index"

export const EnquiryType = sequelize.define(
  "enquiry_type",
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
    mode_of_enquiry: {
      type: Sequelize.INTEGER,
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
          const lastLob = await EnquiryType.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastLob) {
            
            const lastId = lastLob.sequence_number;
            const numericPart = parseInt(lastId.slice(4), 10);

            const newId = `ENQT${(numericPart + 1).toString().padStart(3, "0")}`;
            enquiry_type.sequence_number = newId;
          } else {
            enquiry_type.sequence_number = "ENQT001";
          }
        }
      },
    },
    timestamps: true,
  }
);
Company.hasMany(EnquiryType, { constraints: true, foreignKey: "company_id" });
EnquiryType.belongsTo(Company, { constraints: true, foreignKey: "company_id" });

CustomerLOB.hasMany(EnquiryType, { constraints: true, foreignKey: "lob_id" });
EnquiryType.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });

 
EnumeratedValue.hasMany(EnquiryType, { constraints: true, foreignKey: "mode_of_enquiry" });
EnquiryType.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "mode_of_enquiry" });
export default EnquiryType;
