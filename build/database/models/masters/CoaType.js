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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const database_1 = require("../../database");
const process_1 = require("process");
const CoaType = database_1.sequelize.define("coa_types", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sequence_number: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    // company_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references:{
    //     model:Company,
    //     key:"id"
    //   }
    // },
    name: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    module: {
        type: sequelize_1.default.STRING(100),
        allowNull: true,
    },
    remark: {
        type: sequelize_1.default.STRING(100),
        allowNull: true,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: true,
    },
}, {
    timestamps: false,
});
CoaType.addHook("beforeCreate", (coatype) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the current prefix code from the PrefixCodes table
    const prefixCodeRow = process_1.env.COA_TYPE_CODE;
    if (!prefixCodeRow) {
        throw new Error("Prefix code not found");
    }
    const prefixCode = prefixCodeRow;
    // Find the highest existing sequential number for the given prefix code
    const existingCodes = yield CoaType.findAll({
        where: {
            sequence_number: {
                [sequelize_1.Op.like]: `${prefixCode}%`,
            },
        },
    });
    if (existingCodes.length === 0) {
        // If no existing codes with the prefix code are found, start with "001"
        coatype.sequence_number = `${prefixCode}001`;
    }
    else {
        // Find the highest existing sequential number
        const sequentialNumbers = existingCodes.map((code) => {
            const sequentialNumber = parseInt(code.sequence_number.replace(prefixCode, ""), 10);
            return isNaN(sequentialNumber) ? 0 : sequentialNumber;
        });
        const highestSequentialNumber = Math.max(...sequentialNumbers);
        // Format the next sequential number with leading zeros
        const nextSequentialNumber = (highestSequentialNumber + 1).toString().padStart(3, "0");
        // Generate the unique customer code
        coatype.sequence_number = `${prefixCode}${nextSequentialNumber}`;
    }
}));
exports.default = CoaType;
