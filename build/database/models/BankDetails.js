"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../database");
const State_1 = __importDefault(require("./submasters/State"));
const BankDetails = database_1.sequelize.define("bank_detail", {
    account_number: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    account_type: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    branch: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    ifsc_code: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    cheque_leaf_attachment: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    file_original_name: {
        type: sequelize_1.default.STRING,
        allowNull: true,
    },
    city: {
        type: sequelize_1.default.STRING,
    },
    state_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        // references:{
        //   model:State,
        //   key:"id"
        // }
    },
    entity_type: {
        type: sequelize_1.default.STRING,
    },
});
State_1.default.hasMany(BankDetails, { constraints: true, foreignKey: "state_id" });
BankDetails.belongsTo(State_1.default, { constraints: true, foreignKey: "state_id" });
exports.default = BankDetails;
