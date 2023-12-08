"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialMapping = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.FinancialMapping = database_1.sequelize.define("outlet_financial_mapping", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    outlet_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: index_1.Outlet,
            key: "id"
        }
    },
    business_unit_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: index_1.BusinessUnit,
            key: "id"
        }
    },
    lob_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: index_1.CustomerLOB,
            key: "id"
        }
    },
    costcenter_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: index_1.CostCenter,
            key: "id"
        }
    }
});
exports.FinancialMapping.belongsTo(index_1.BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
exports.FinancialMapping.belongsTo(index_1.CustomerLOB, { constraints: true, foreignKey: "lob_id" });
exports.FinancialMapping.belongsTo(index_1.CostCenter, { constraints: true, foreignKey: "costcenter_id" });
exports.default = exports.FinancialMapping;
