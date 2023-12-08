"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkingHoursMapping = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.WorkingHoursMapping = database_1.sequelize.define("outlet_working_hours_mapping", {
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
    shift: {
        type: sequelize_1.default.STRING(200),
    },
    shift_type: {
        type: sequelize_1.default.STRING(200),
    },
    shift_start_time: {
        type: sequelize_1.default.STRING(200),
    },
    shift_end_time: {
        type: sequelize_1.default.STRING(200),
    },
    is_night_shift: {
        type: sequelize_1.default.BOOLEAN,
    }
});
exports.default = exports.WorkingHoursMapping;
