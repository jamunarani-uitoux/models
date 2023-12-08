"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTerm = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.PaymentTerm = database_1.sequelize.define("payment_term", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    descripition: {
        type: sequelize_1.default.TEXT,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
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
});
index_1.Company.hasMany(exports.PaymentTerm, { constraints: true, foreignKey: "company_id" });
exports.PaymentTerm.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id", });
exports.default = exports.PaymentTerm;
