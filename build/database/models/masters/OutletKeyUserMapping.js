"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyUserMapping = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.KeyUserMapping = database_1.sequelize.define("key_user_mapping", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: sequelize_1.default.STRING(100),
    },
    ecode: {
        type: sequelize_1.default.STRING(100),
    },
    designation: {
        type: sequelize_1.default.STRING(100),
    },
    name: {
        type: sequelize_1.default.STRING(100),
    },
    email: {
        type: sequelize_1.default.STRING(100),
    },
    mobile_number: {
        type: sequelize_1.default.STRING,
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
    cost_center_id: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: index_1.CostCenter,
            key: "id"
        }
    }
});
exports.default = exports.KeyUserMapping;
