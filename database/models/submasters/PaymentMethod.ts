import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

const PaymentMethod = sequelize.define(
  "payment_method",
  {
    id: {
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER(),
      allowNull: false,
      /*  references: {
        model: Company,
        key: "id",
      }, */
    },
    code: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    label: {
      type: Sequelize.STRING(255),
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    /* hooks: {
      beforeValidate: async (lob: any) => {
        if (!lob.lob_sequence_no) {
          const lastLob = await PaymentMethod.findOne({
            order: [["lob_sequence_no", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.lob_sequence_no;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `LOB${(numericPart + 1).toString().padStart(3, "0")}`;
            lob.lob_sequence_no = newId;
          } else {
            lob.lob_sequence_no = "LOB001";
          }
        }
      },
    }, */
    timestamps: true,
  }
);
Company.hasMany(PaymentMethod, {constraints: true,foreignKey: "company_id",});
PaymentMethod.belongsTo(Company, {constraints: true,foreignKey: "company_id",});
export default PaymentMethod;
