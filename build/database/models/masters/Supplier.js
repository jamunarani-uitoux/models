"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
const SupplierMaster = database_1.sequelize.define("supplier", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    vendor_id: {
        type: sequelize_1.default.BIGINT,
        allowNull: false
    },
    vendor_name: {
        type: sequelize_1.default.STRING
    },
    vendor_number: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    vendor_site_id: {
        type: sequelize_1.default.BIGINT,
        allowNull: false
    },
    vendor_site_code: {
        type: sequelize_1.default.STRING,
    },
    vendor_type_lookup_code: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    address_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    ax_vendor_code: {
        type: sequelize_1.default.STRING
    },
    bank_details_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    payment_method_code: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    payment_term_name: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    legal_entity: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    business_unit_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    pan_number: {
        type: sequelize_1.default.STRING
    },
    // gst: {
    //     type: Sequelize.STRING
    // },
    gstn: {
        type: sequelize_1.default.STRING
    },
}, {
    timestamps: false,
});
index_1.VendorTypes.hasMany(SupplierMaster, { constraints: true, foreignKey: "vendor_type_lookup_code" });
SupplierMaster.belongsTo(index_1.VendorTypes, { constraints: true, foreignKey: "vendor_type_lookup_code" });
index_1.Address.hasMany(SupplierMaster, { constraints: true, foreignKey: "address_id" });
SupplierMaster.belongsTo(index_1.Address, { constraints: true, foreignKey: "address_id" });
index_1.BankDetails.hasMany(SupplierMaster, { constraints: true, foreignKey: "bank_details_id" });
SupplierMaster.belongsTo(index_1.BankDetails, { constraints: true, foreignKey: "bank_details_id" });
index_1.PaymentMethod.hasMany(SupplierMaster, { constraints: true, foreignKey: "payment_method_code" });
SupplierMaster.belongsTo(index_1.PaymentMethod, { constraints: true, foreignKey: "payment_method_code" });
index_1.PaymentTerm.hasMany(SupplierMaster, { constraints: true, foreignKey: "payment_term_name" });
SupplierMaster.belongsTo(index_1.PaymentTerm, { constraints: true, foreignKey: "payment_term_name" });
index_1.Company.hasMany(SupplierMaster, { constraints: true, foreignKey: "legal_entity" });
SupplierMaster.belongsTo(index_1.Company, { constraints: true, foreignKey: "legal_entity" });
index_1.BusinessUnit.hasMany(SupplierMaster, { constraints: true, foreignKey: "business_unit_id" });
SupplierMaster.belongsTo(index_1.BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
exports.default = SupplierMaster;
