import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

export const EnumeratedValue = sequelize.define(
  "enumerated_value",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.STRING(255),
    },
    label: {
      type: Sequelize.STRING(255),
    },
    select_values: {
      type: Sequelize.STRING(255),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    /*hooks: {
      beforeValidate: async (region: any) => {
        // console.log("dsfsiuwuiejk", region);
        if (!region.region_code) {
          const lastState = await State.findOne({ where: { id: region.state_id }, });
          if (lastState) {
            const lastLob = await Region.findOne({
              where: { state_id: region.state_id },
              order: [['id', 'DESC']],
            });
            if (lastLob) {
              const lastId = lastLob.region_code;
              const numericPart = parseInt(lastId.slice(2), 10);
              const newId = `${lastState.dataValues.state_code}${(numericPart + 1).toString().padStart(1, '0')}`;
              region.region_code = newId;
            } else {
              const stateId = lastState.dataValues.state_code;
              region.region_code = `${stateId}1`;
            }
          }
        }
      },
      beforeUpdate: async (region: any, instance: any) => {
        console.log("dsfsiuwuiejk", region);
      },
    }*/
    timestamps: true,
  }
);
export default EnumeratedValue;
