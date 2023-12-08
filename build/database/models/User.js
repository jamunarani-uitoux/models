"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const User = database_1.sequelize.define("user", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    role_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        defaultValue: false
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true
    },
});
// User.generateJWT = function (payload:any) {
//     var token = jwt.sign(payload, 'test');
//     return `Bearer ${token}`;
//   };
exports.default = User;
