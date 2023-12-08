"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessUnit = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.BusinessUnit = database_1.sequelize.define("business_unit", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    code: {
        type: sequelize_1.default.STRING(11),
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    /*  hooks: {
      beforeValidate: async (sub_aggregate: any) => {
        if (!sub_aggregate.sub_aggregate_sequence_number) {
          const lastLob = await SubAggregate.findOne({
            order: [["sub_aggregate_sequence_number", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sub_aggregate_sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `SAG${(numericPart + 1).toString().padStart(3, "0")}`;
            sub_aggregate.sub_aggregate_sequence_number = newId;
          } else {
            sub_aggregate.sub_aggregate_sequence_number = "SAG001";
          }
        }
      },
    }, */
    timestamps: true,
});
index_1.Company.hasMany(exports.BusinessUnit, { constraints: true, foreignKey: "company_id" });
exports.BusinessUnit.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
exports.default = exports.BusinessUnit;
