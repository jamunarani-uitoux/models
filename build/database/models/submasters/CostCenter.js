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
exports.CostCenter = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const AuditLog_1 = require("../AuditLog");
const index_1 = require("../index");
exports.CostCenter = database_1.sequelize.define("cost_center", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    business_unit_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
    },
    code: {
        type: sequelize_1.default.STRING(100),
        allowNull: false,
    },
    description: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    module: {
        type: sequelize_1.default.STRING(100),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        /*  beforeCreate: async (cost_center: any) => {
          if (!cost_center.code) {
            const lastLob = await CostCenter.findOne({
              order: [['code', 'DESC']],
            });
            if (lastLob) {
              const lastId = lastLob.code;
              const numericPart = parseInt(lastId.slice(3), 10);
              const newId = `CC${(numericPart + 1).toString().padStart(3, '0')}`;
              cost_center.code = newId;
            } else {
              cost_center.code = 'CC001';
            }
          }
        }, */
        afterCreate: (cost_center, instance) => __awaiter(void 0, void 0, void 0, function* () {
            const dataValuesText = JSON.stringify(cost_center.dataValues);
            yield AuditLog_1.AuditLog.create({
                action: "create",
                userId: 1,
                table_name: "cost_center",
                recordId: cost_center.dataValues.id,
                newData: dataValuesText,
            });
        }),
        afterUpdate: (cost_center, instance) => __awaiter(void 0, void 0, void 0, function* () {
            if (cost_center._changed && cost_center._changed.size > 1) {
                const dataValuesText = JSON.stringify(cost_center.dataValues);
                const PreviousDataValuesText = JSON.stringify(cost_center._previousDataValues);
                /*  await AuditLog.create({
                  action: 'update',
                  userId: cost_center.userId,
                  table_name: 'cost_center',
                  recordId: cost_center.id,
                  oldData: dataValuesText,
                  newData: PreviousDataValuesText,
                  affectedRows:changedText
                }); */
            }
        }),
        afterDestroy: (cost_center, instance) => __awaiter(void 0, void 0, void 0, function* () {
            yield AuditLog_1.AuditLog.create({
                action: "delete",
                userId: instance.userId,
                tableMaster: "supplier_master",
                recordId: instance.id,
                oldData: instance.toJSON(),
            });
        }),
    },
    timestamps: true,
});
index_1.Company.hasMany(exports.CostCenter, { constraints: true, foreignKey: "company_id" });
exports.CostCenter.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
index_1.BusinessUnit.hasMany(exports.CostCenter, { constraints: true, foreignKey: "business_unit_id" });
exports.CostCenter.belongsTo(index_1.BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
exports.default = exports.CostCenter;
