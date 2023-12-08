"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const State_1 = __importDefault(require("./State"));
const Company_1 = __importDefault(require("../masters/Company"));
exports.Bank = database_1.sequelize.define("banks", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        references: {
            model: Company_1.default,
            key: "id"
        }
    },
    account_number: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    account_type: {
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
    // city_id: {
    //   type: Sequelize.INTEGER,
    // },
    city: {
        type: sequelize_1.default.STRING,
    },
    state_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        references: {
            model: State_1.default,
            key: "id"
        }
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
    },
}, {
    timestamps: true,
});
exports.Bank.belongsTo(State_1.default, { constraints: true, foreignKey: "state_id" });
exports.Bank.belongsTo(Company_1.default, { constraints: true, foreignKey: "company_id" });
exports.default = exports.Bank;
