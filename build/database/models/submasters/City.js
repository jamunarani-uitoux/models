"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.City = database_1.sequelize.define("city", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.default.STRING(255),
        allowNull: false
    },
    district_id: {
        type: sequelize_1.default.INTEGER,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});
index_1.District.hasMany(exports.City, { constraints: true, foreignKey: "district_id" });
exports.City.belongsTo(index_1.District, { constraints: true, foreignKey: "district_id" });
exports.default = exports.City;
