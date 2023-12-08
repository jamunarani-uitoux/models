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
exports.Region = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
exports.Region = database_1.sequelize.define("region", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    code: {
        type: sequelize_1.default.STRING(255),
    },
    name: {
        type: sequelize_1.default.STRING(255),
    },
    state_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    country_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    hooks: {
        // beforeValidate: async (region: any) => {
        //   if (!region.code) {
        //     const lastState = await State.findOne({
        //       where: { id: region.state_id },
        //     });          
        //     if (lastState) {
        //       const lastLob = await Region.findOne({
        //         where: { state_id: region.state_id },
        //         order: [["id", "DESC"]],
        //       });
        //       if (lastLob) {
        //         const lastId = lastLob.code;
        //         const numericPart = parseInt(lastId.slice(2), 10);
        //         const newId = `${lastState.dataValues.code}${(
        //           numericPart + 1
        //         )
        //           .toString()
        //           .padStart(1, "0")}`;
        //         region.code = newId;
        //       } else {
        //         const stateId = lastState.dataValues.code;
        //         region.code = `${stateId}1`;
        //       }
        //     }
        //   }
        // },
        beforeUpdate: (region, instance) => __awaiter(void 0, void 0, void 0, function* () { }),
    },
    timestamps: true,
});
index_1.Company.hasMany(exports.Region, { constraints: true, foreignKey: "company_id" });
exports.Region.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
index_1.State.hasMany(exports.Region, { constraints: true, foreignKey: "state_id" });
exports.Region.belongsTo(index_1.State, { constraints: true, foreignKey: "state_id" });
index_1.Country.hasMany(exports.Region, { constraints: true, foreignKey: "country_id" });
exports.Region.belongsTo(index_1.Country, { constraints: true, foreignKey: "country_id" });
exports.default = exports.Region;
