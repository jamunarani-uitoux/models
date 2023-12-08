"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierContactPerson = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.SupplierContactPerson = database_1.sequelize.define("supplier_contact_person", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplier_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    email_id: {
        type: sequelize_1.default.STRING(100),
    },
    mobile_number: {
        type: sequelize_1.default.STRING(100),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    timestamps: true,
    tableName: 'supplier_contact_person'
});
index_1.SupplierMaster.hasMany(exports.SupplierContactPerson, { constraints: true, foreignKey: "supplier_id" });
exports.SupplierContactPerson.belongsTo(index_1.SupplierMaster, { constraints: true, foreignKey: "supplier_id", });
exports.default = exports.SupplierContactPerson;
