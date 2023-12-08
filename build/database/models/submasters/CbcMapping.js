"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
const CbcMapping = database_1.sequelize.define("cbc_mapping", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    sequence_number: {
        type: sequelize_1.default.STRING(255),
    },
    business_unit_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    lob_id: {
        type: sequelize_1.default.INTEGER(),
        allowNull: false,
    },
    cost_center_id: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        /*   beforeCreate: async (cbc_mapping: any) => {
          if (!cbc_mapping.cbc_mapping_sequence_number) {
            const lastLob = await CbcMapping.findOne({
              order: [["cbc_mapping_sequence_number", "DESC"]],
            });
            if (lastLob) {
              const lastId = lastLob.cbc_mapping_sequence_number;
              const numericPart = parseInt(lastId.slice(3), 10);
              const newId = `CBC${(numericPart + 1).toString().padStart(3, "0")}`;
              cbc_mapping.cbc_mapping_sequence_number = newId;
            } else {
              cbc_mapping.cbc_mapping_sequence_number = "CBC001";
            }
          }
        }, */
        beforeUpdate: (cost_center, instance) => __awaiter(void 0, void 0, void 0, function* () { }),
    },
    timestamps: true,
});
index_1.Company.hasMany(CbcMapping, { constraints: true, foreignKey: "company_id" });
CbcMapping.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id", });
index_1.BusinessUnit.hasMany(CbcMapping, { constraints: true, foreignKey: "business_unit_id", });
CbcMapping.belongsTo(index_1.BusinessUnit, { constraints: true, foreignKey: "business_unit_id", });
index_1.CustomerLOB.hasMany(CbcMapping, { constraints: true, foreignKey: "lob_id" });
CbcMapping.belongsTo(index_1.CustomerLOB, { constraints: true, foreignKey: "lob_id", });
exports.default = CbcMapping;
