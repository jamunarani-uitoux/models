"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumeratedValue = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
exports.EnumeratedValue = database_1.sequelize.define("enumerated_value", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    value: {
        type: sequelize_1.default.STRING(255),
    },
    label: {
        type: sequelize_1.default.STRING(255),
    },
    select_values: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
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
});
exports.default = exports.EnumeratedValue;
