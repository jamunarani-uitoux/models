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
exports.Tax = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
exports.Tax = database_1.sequelize.define("taxes", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sequence_number: {
        type: sequelize_1.default.STRING(255),
    },
    name: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    tax_type: {
        type: sequelize_1.default.STRING(),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (tax) => __awaiter(void 0, void 0, void 0, function* () {
            if (!tax.sequence_number) {
                const lastLob = yield exports.Tax.findOne({
                    order: [["sequence_number", "DESC"]],
                });
                if (lastLob) {
                    const lastId = lastLob.sequence_number;
                    const numericPart = parseInt(lastId.slice(3), 10);
                    const newId = `TAX${(numericPart + 1).toString().padStart(3, "0")}`;
                    tax.sequence_number = newId;
                }
                else {
                    tax.sequence_number = "TAX001";
                }
            }
        }),
    },
    timestamps: true,
});
// EnumeratedValue.hasMany(Tax, {
//   constraints: true,
//   foreignKey: "tax_type",
// });
// Tax.belongsTo(EnumeratedValue, {
//   constraints: true,
//   foreignKey: "tax_type",
// });
exports.default = exports.Tax;
