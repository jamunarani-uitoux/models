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
exports.VendorTypes = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
exports.VendorTypes = database_1.sequelize.define("vendor_types", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sequence_no: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    description: {
        type: sequelize_1.default.TEXT,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (vendor_types) => __awaiter(void 0, void 0, void 0, function* () {
            if (!vendor_types.sequence_no) {
                const lastLob = yield exports.VendorTypes.findOne({
                    order: [["sequence_no", "DESC"]],
                });
                if (lastLob) {
                    const lastId = lastLob.sequence_no;
                    const numericPart = parseInt(lastId.slice(3), 10);
                    const newId = `VT${(numericPart + 1).toString().padStart(3, "0")}`;
                    vendor_types.sequence_no = newId;
                }
                else {
                    vendor_types.sequence_no = "VT001";
                }
            }
        }),
    },
    timestamps: true,
});
exports.default = exports.VendorTypes;
