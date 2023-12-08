"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.Model = database_1.sequelize.define("model", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
    code: {
        type: sequelize_1.default.STRING(255),
    },
    name: {
        type: sequelize_1.default.TEXT,
    },
    oem_id: {
        type: sequelize_1.default.INTEGER,
    },
}, {
    // hooks: {
    //   beforeValidate: async (model: any) => {
    //     if (!model.sequence_no) {
    //       const lastLob = await Model.findOne({
    //         order: [["sequence_number", "DESC"]],
    //       });
    //       if (lastLob) {
    //         const lastId = lastLob.sequence_number;
    //         const numericPart = parseInt(lastId.slice(3), 10);
    //         const newId = `MOD${(numericPart + 1).toString().padStart(3, "0")}`;
    //         model.sequence_number = newId;
    //       } else {
    //         model.sequence_number = "MOD001";
    //       }
    //     }
    //   },
    // },
    timestamps: true,
});
index_1.Company.hasMany(exports.Model, { constraints: true, foreignKey: "company_id" });
exports.Model.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id", });
// CustomerLOB.hasMany(Model, { constraints: true, foreignKey: "lob_id" });
// Model.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id", });
// EnumeratedValue.hasMany(Model, { constraints: true, foreignKey: "segments" });
// Model.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "segments", });
// EnumeratedValue.hasMany(Model, { constraints: true, foreignKey: "supplier_id" });
// Model.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "supplier_id", });
// EnumeratedValue.hasMany(Model, { constraints: true, foreignKey: "supplier_id" });
// Model.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "supplier_id", });
exports.default = exports.Model;
