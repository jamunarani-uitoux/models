"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const CustomerCrossBilling = database_1.sequelize.define("customer_cross_billingds", {
    id: {
        type: sequelize_1.default.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    type: {
        type: sequelize_1.default.STRING(255),
    },
    description: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN(),
    },
});
exports.default = CustomerCrossBilling;
