"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = require("../../database");
const process_1 = require("process");
const Company_1 = __importDefault(require("../masters/Company"));
const SerialNumberSegment = database_1.sequelize.define("serial_number_segments", {
    id: {
        type: sequelize_1.default.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    serial_number: {
        type: sequelize_1.default.STRING(15)
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        references: {
            model: Company_1.default,
            key: "id"
        }
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    type: {
        type: sequelize_1.default.STRING(255),
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
    },
}, {
    timestamps: true
});
SerialNumberSegment.belongsTo(Company_1.default, { constraints: true, foreignKey: "company_id" });
SerialNumberSegment.addHook("beforeCreate", (serialNumberSegment) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the current prefix code from the PrefixCodes table
    const prefixCodeRow = process_1.env.SERIAL_NUMBER_SEGMENT;
    if (!prefixCodeRow) {
        throw new Error("Prefix code not found");
    }
    const prefixCode = prefixCodeRow;
    // Find the highest existing sequential number for the given prefix code
    const existingCodes = yield SerialNumberSegment.findAll({
        where: {
            serial_number: {
                [sequelize_1.Op.like]: `${prefixCode}%`,
            },
        },
    });
    if (existingCodes.length === 0) {
        // If no existing codes with the prefix code are found, start with "001"
        serialNumberSegment.serial_number = `${prefixCode}001`;
    }
    else {
        // Find the highest existing sequential number
        const sequentialNumbers = existingCodes.map((code) => {
            const sequentialNumber = parseInt(code.serial_number.replace(prefixCode, ""), 10);
            return isNaN(sequentialNumber) ? 0 : sequentialNumber;
        });
        const highestSequentialNumber = Math.max(...sequentialNumbers);
        // Format the next sequential number with leading zeros
        const nextSequentialNumber = (highestSequentialNumber + 1).toString().padStart(3, "0");
        // Generate the unique customer code
        serialNumberSegment.serial_number = `${prefixCode}${nextSequentialNumber}`;
    }
}));
exports.default = SerialNumberSegment;
