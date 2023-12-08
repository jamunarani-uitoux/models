"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
const PaymentMethod = database_1.sequelize.define("payment_method", {
    id: {
        type: sequelize_1.default.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER(),
        allowNull: false,
        /*  references: {
          model: Company,
          key: "id",
        }, */
    },
    code: {
        type: sequelize_1.default.STRING(255),
        allowNull: false,
    },
    label: {
        type: sequelize_1.default.STRING(255),
    },
    description: {
        type: sequelize_1.default.TEXT,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1,
    },
}, {
    /* hooks: {
      beforeValidate: async (lob: any) => {
        if (!lob.lob_sequence_no) {
          const lastLob = await PaymentMethod.findOne({
            order: [["lob_sequence_no", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.lob_sequence_no;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `LOB${(numericPart + 1).toString().padStart(3, "0")}`;
            lob.lob_sequence_no = newId;
          } else {
            lob.lob_sequence_no = "LOB001";
          }
        }
      },
    }, */
    timestamps: true,
});
index_1.Company.hasMany(PaymentMethod, { constraints: true, foreignKey: "company_id", });
PaymentMethod.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id", });
exports.default = PaymentMethod;
