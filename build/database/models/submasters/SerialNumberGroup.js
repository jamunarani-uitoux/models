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
exports.SerialNumberGroup = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.SerialNumberGroup = database_1.sequelize.define("serial_number_group", {
    id: {
        type: sequelize_1.default.INTEGER(),
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
    financial_year: {
        type: sequelize_1.default.STRING(20),
    },
    state_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    business_unit_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    lob_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    outlets_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    type: {
        type: sequelize_1.default.STRING(255),
    },
    starting_number: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    ending_number: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    length: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    next_number: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    segments: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    values: {
        type: sequelize_1.default.STRING(255),
    },
    display_order: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        beforeValidate: (serialNumberGroup) => __awaiter(void 0, void 0, void 0, function* () {
            if (!serialNumberGroup.sequence_number) {
                const lastSerialNumberGroup = yield exports.SerialNumberGroup.findOne({
                    order: [["sequence_number", "DESC"]],
                });
                if (lastSerialNumberGroup) {
                    const lastId = lastSerialNumberGroup.sequence_number;
                    const numericPart = parseInt(lastId.slice(3), 10);
                    const newId = `SNG${(numericPart + 1).toString().padStart(3, "0")}`;
                    serialNumberGroup.sequence_number = newId;
                }
                else {
                    serialNumberGroup.sequence_number = "SNG001";
                }
            }
        }),
        // afterCreate: async (cost_center: any, instance: any) => {
        //   const dataValuesText = JSON.stringify(cost_center.dataValues);
        //   await AuditLog.create({
        //     action: "create",
        //     userId: 1,
        //     table_name: "cost_center",
        //     recordId: cost_center.dataValues.id,
        //     newData: dataValuesText,
        //   });
        // },
        // afterUpdate: async (cost_center: any, instance: any) => {
        //   if (cost_center._changed && cost_center._changed.size > 1) {
        //     const dataValuesText = JSON.stringify(cost_center.dataValues);
        //     const PreviousDataValuesText = JSON.stringify(
        //       cost_center._previousDataValues
        //     );
        //     /*  await AuditLog.create({
        //       action: 'update',
        //       userId: cost_center.userId,
        //       table_name: 'cost_center',
        //       recordId: cost_center.id,
        //       oldData: dataValuesText,
        //       newData: PreviousDataValuesText,
        //       affectedRows:changedText
        //     }); */
        //   }
        // },
        // afterDestroy: async (cost_center: any, instance: any) => {
        //   await AuditLog.create({
        //     action: "delete",
        //     userId: instance.userId,
        //     tableMaster: "supplier_master",
        //     recordId: instance.id,
        //     oldData: instance.toJSON(),
        //   });
        // },
    },
    timestamps: true,
});
index_1.Company.hasMany(exports.SerialNumberGroup, { constraints: true, foreignKey: "company_id" });
exports.SerialNumberGroup.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
index_1.State.hasMany(exports.SerialNumberGroup, { constraints: true, foreignKey: "state_id" });
exports.SerialNumberGroup.belongsTo(index_1.State, { constraints: true, foreignKey: "state_id" });
index_1.BusinessUnit.hasMany(exports.SerialNumberGroup, { constraints: true, foreignKey: "business_unit_id" });
exports.SerialNumberGroup.belongsTo(index_1.BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
index_1.CustomerLOB.hasMany(exports.SerialNumberGroup, { constraints: true, foreignKey: "lob_id" });
exports.SerialNumberGroup.belongsTo(index_1.CustomerLOB, { constraints: true, foreignKey: "lob_id" });
index_1.EnumeratedValue.hasMany(exports.SerialNumberGroup, { constraints: true, foreignKey: "segments" });
exports.SerialNumberGroup.belongsTo(index_1.EnumeratedValue, { constraints: true, foreignKey: "segments" });
exports.default = exports.SerialNumberGroup;
