"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
exports.AuditLog = database_1.sequelize.define("auditLogs", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
    },
    action: {
        type: sequelize_1.default.STRING(10),
        allowNull: false,
    },
    table_name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    recordId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    oldData: {
        type: sequelize_1.default.TEXT,
    },
    newData: {
        type: sequelize_1.default.TEXT,
    },
    affectedRows: {
        type: sequelize_1.default.TEXT,
    },
});
exports.default = exports.AuditLog;
