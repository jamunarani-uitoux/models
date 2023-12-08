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
exports.TaxCode = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.TaxCode = database_1.sequelize.define("tax_code", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sequence_number: {
        type: sequelize_1.default.STRING(255),
    },
    number: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    tax_code_types: {
        type: sequelize_1.default.STRING(),
    },
    tax_id: {
        type: sequelize_1.default.INTEGER(),
    },
    percentage: {
        type: sequelize_1.default.DECIMAL(),
    },
    state_id: {
        type: sequelize_1.default.INTEGER(),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (tax_code) => __awaiter(void 0, void 0, void 0, function* () {
            if (!tax_code.sequence_number) {
                const lastLob = yield exports.TaxCode.findOne({
                    order: [["sequence_number", "DESC"]],
                });
                if (lastLob) {
                    const lastId = lastLob.sequence_number;
                    const numericPart = parseInt(lastId.slice(3), 10);
                    const newId = `TCO${(numericPart + 1).toString().padStart(3, "0")}`;
                    tax_code.sequence_number = newId;
                }
                else {
                    tax_code.sequence_number = "TCO001";
                }
            }
        }),
    },
    timestamps: true,
});
index_1.Tax.hasMany(exports.TaxCode, {
    constraints: true,
    foreignKey: "tax_id",
});
exports.TaxCode.belongsTo(index_1.Tax, {
    constraints: true,
    foreignKey: "tax_id",
});
index_1.State.hasMany(exports.TaxCode, {
    constraints: true,
    foreignKey: "state_id",
});
exports.TaxCode.belongsTo(index_1.State, {
    constraints: true,
    foreignKey: "state_id",
});
// EnumeratedValue.hasMany(TaxCode, {
//   constraints: true,
//   foreignKey: "tax_code_types",
// });
// TaxCode.belongsTo(EnumeratedValue, {
//   constraints: true,
//   foreignKey: "tax_code_types",
// });
exports.default = exports.TaxCode;
