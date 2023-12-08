"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const VendorMaster = database_1.sequelize.define("vendor", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true
    },
    createdBy: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
    },
    updatedBy: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
    },
    deletedAt: {
        type: sequelize_1.default.DATE,
        allowNull: true,
    },
    deletedBy: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
    }
});
exports.default = VendorMaster;
