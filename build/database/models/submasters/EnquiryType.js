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
exports.EnquiryType = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.EnquiryType = database_1.sequelize.define("enquiry_type", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER(),
        allowNull: false
    },
    sequence_number: {
        type: sequelize_1.default.STRING(255),
    },
    lob_id: {
        type: sequelize_1.default.INTEGER(),
    },
    mode_of_enquiry: {
        type: sequelize_1.default.INTEGER,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (enquiry_type) => __awaiter(void 0, void 0, void 0, function* () {
            if (!enquiry_type.sequence_number) {
                const lastLob = yield exports.EnquiryType.findOne({
                    order: [["sequence_number", "DESC"]],
                });
                if (lastLob) {
                    const lastId = lastLob.sequence_number;
                    const numericPart = parseInt(lastId.slice(4), 10);
                    const newId = `ENQT${(numericPart + 1).toString().padStart(3, "0")}`;
                    enquiry_type.sequence_number = newId;
                }
                else {
                    enquiry_type.sequence_number = "ENQT001";
                }
            }
        }),
    },
    timestamps: true,
});
index_1.Company.hasMany(exports.EnquiryType, { constraints: true, foreignKey: "company_id" });
exports.EnquiryType.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
index_1.CustomerLOB.hasMany(exports.EnquiryType, { constraints: true, foreignKey: "lob_id" });
exports.EnquiryType.belongsTo(index_1.CustomerLOB, { constraints: true, foreignKey: "lob_id" });
index_1.EnumeratedValue.hasMany(exports.EnquiryType, { constraints: true, foreignKey: "mode_of_enquiry" });
exports.EnquiryType.belongsTo(index_1.EnumeratedValue, { constraints: true, foreignKey: "mode_of_enquiry" });
exports.default = exports.EnquiryType;
