"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
exports.Country = database_1.sequelize.define("country", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: sequelize_1.default.STRING(255),
    },
    short_name: {
        type: sequelize_1.default.STRING(255),
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true,
    },
}, {
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
});
exports.default = exports.Country;
