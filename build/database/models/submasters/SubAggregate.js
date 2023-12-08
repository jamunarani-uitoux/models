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
exports.SubAggregate = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.SubAggregate = database_1.sequelize.define("sub_aggregate", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER(),
    },
    sequence_number: {
        type: sequelize_1.default.STRING(255),
    },
    aggregate_id: {
        type: sequelize_1.default.INTEGER(),
    },
    detail: {
        type: sequelize_1.default.STRING(11),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (sub_aggregate) => __awaiter(void 0, void 0, void 0, function* () {
            if (!sub_aggregate.sequence_number) {
                const lastLob = yield exports.SubAggregate.findOne({
                    order: [["sequence_number", "DESC"]],
                });
                if (lastLob) {
                    const lastId = lastLob.sequence_number;
                    const numericPart = parseInt(lastId.slice(3), 10);
                    const newId = `SAG${(numericPart + 1).toString().padStart(3, "0")}`;
                    sub_aggregate.sequence_number = newId;
                }
                else {
                    sub_aggregate.sequence_number = "SAG001";
                }
            }
        }),
    },
    timestamps: true,
});
index_1.Company.hasMany(exports.SubAggregate, { constraints: true, foreignKey: "company_id", });
exports.SubAggregate.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id", });
index_1.Aggregate.hasMany(exports.SubAggregate, { constraints: true, foreignKey: "aggregate_id", });
exports.SubAggregate.belongsTo(index_1.Aggregate, { constraints: true, foreignKey: "aggregate_id", });
exports.default = exports.SubAggregate;
