"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.District = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.District = database_1.sequelize.define("district", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.default.STRING(255),
        allowNull: false
    },
    state_id: {
        type: sequelize_1.default.INTEGER,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});
index_1.State.hasMany(exports.District, { constraints: true, foreignKey: "state_id" });
exports.District.belongsTo(index_1.State, { constraints: true, foreignKey: "state_id" });
exports.default = exports.District;
