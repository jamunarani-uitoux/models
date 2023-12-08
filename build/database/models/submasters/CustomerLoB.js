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
const CustomerLOB = database_1.sequelize.define("lob", {
    id: {
        type: sequelize_1.default.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    business_unit_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    sequence_no: {
        type: sequelize_1.default.STRING(255),
    },
    parent_code: {
        type: sequelize_1.default.STRING(255),
    },
    parent_description: {
        type: sequelize_1.default.TEXT,
    },
    child_code: {
        type: sequelize_1.default.STRING(255),
    },
    child_description: {
        type: sequelize_1.default.TEXT,
    },
    full_description: {
        type: sequelize_1.default.TEXT,
    },
    ax_function: {
        type: sequelize_1.default.STRING(255),
    },
    // cost_center_id: {
    //   type: Sequelize.STRING(255),
    //   allowNull: false,
    // },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (lob) => __awaiter(void 0, void 0, void 0, function* () {
            if (!lob.sequence_no) {
                const lastLob = yield CustomerLOB.findOne({
                    order: [["sequence_no", "DESC"]],
                });
                if (lastLob) {
                    const lastId = lastLob.sequence_no;
                    const numericPart = parseInt(lastId.slice(3), 10);
                    const newId = `LOB${(numericPart + 1).toString().padStart(3, "0")}`;
                    lob.sequence_no = newId;
                }
                else {
                    lob.sequence_no = "LOB001";
                }
            }
        }),
    },
    timestamps: true,
});
index_1.BusinessUnit.hasMany(CustomerLOB, { constraints: true, foreignKey: "business_unit_id" });
CustomerLOB.belongsTo(index_1.BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
index_1.Company.hasMany(CustomerLOB, { constraints: true, foreignKey: "company_id" });
CustomerLOB.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
exports.default = CustomerLOB;
