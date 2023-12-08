import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

export const PaymentTerm = sequelize.define(
  "payment_term",
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
    name: {
      type: Sequelize.STRING(255),
    },
    descripition: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    /*   hooks: {
      beforeCreate: async (cost_center: any) => {
        if (!cost_center.cost_center_code) {
          const lastLob = await CostCenter.findOne({
            order: [['cost_center_code', 'DESC']],
          });
          if (lastLob) {
            const lastId = lastLob.cost_center_code;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `CC${(numericPart + 1).toString().padStart(3, '0')}`;
            cost_center.cost_center_code = newId;
          } else {
            cost_center.cost_center_code = 'CC001';
          }
        }
      },
      beforeUpdate: async (cost_center: any, instance: any) => {
      },
    }, */
    timestamps: true,
  }
);
Company.hasMany(PaymentTerm, { constraints: true, foreignKey: "company_id" });
PaymentTerm.belongsTo(Company, {constraints: true,foreignKey: "company_id",});
export default PaymentTerm;
