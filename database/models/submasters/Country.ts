import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

export const Country = sequelize.define(
  "country",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
   
    code: {
      type: Sequelize.STRING(255),
    },
    short_name: {
      type: Sequelize.STRING(255),
    },
    name: {
      type: Sequelize.STRING(255),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    /* hooks: {
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
export default Country;
