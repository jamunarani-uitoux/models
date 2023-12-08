"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const index_1 = require("../index");
const Customer = database_1.sequelize.define("customer", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    organization_type_id: {
        type: sequelize_1.default.INTEGER,
    },
    dms_customer_number: {
        type: sequelize_1.default.STRING(255),
    },
    prefix: {
        type: sequelize_1.default.STRING(20),
        // defaultValue: "Mr"
    },
    first_name: {
        type: sequelize_1.default.STRING(255),
    },
    middle_name: {
        type: sequelize_1.default.STRING(255),
    },
    last_name: {
        type: sequelize_1.default.STRING(255),
    },
    pan_number: {
        type: sequelize_1.default.STRING(255),
        allowNull: false
    },
    gst_number: {
        type: sequelize_1.default.STRING(255),
    },
    account_established: {
        type: sequelize_1.default.DATEONLY,
        // defaultValue: Sequelize.fn('STR_TO_DATE', '01/01/2000', '%d/%m/%Y')
    },
    address_id: {
        type: sequelize_1.default.INTEGER,
    },
    account_address_set: {
        type: sequelize_1.default.STRING(255),
    },
    customer_group_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    customer_segment_id: {
        type: sequelize_1.default.STRING(255),
    },
    lob_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    sales_executive: {
        type: sequelize_1.default.STRING(255),
    },
    cross_billing: {
        type: sequelize_1.default.STRING(10),
    },
    customer_type: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    oracle_customer_code: {
        type: sequelize_1.default.INTEGER,
        allowNull: true
    },
    bank_details_id: {
        type: sequelize_1.default.INTEGER
    },
    shipping_info_id: {
        type: sequelize_1.default.INTEGER
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1
    },
    email: {
        type: sequelize_1.default.STRING,
        defaultValue: 1
    },
    mobile_no: {
        type: sequelize_1.default.STRING,
        defaultValue: 1
    },
}, {
    timestamps: false,
});
index_1.Company.hasMany(Customer, { constraints: true, foreignKey: "company_id" });
Customer.belongsTo(index_1.Company, { constraints: true, foreignKey: "company_id" });
index_1.OrganizationType.hasMany(Customer, { constraints: true, foreignKey: "organization_type_id" });
Customer.belongsTo(index_1.OrganizationType, { constraints: true, foreignKey: "organization_type_id" });
index_1.Address.hasMany(Customer, { constraints: true, foreignKey: "address_id" });
Customer.belongsTo(index_1.Address, { constraints: true, foreignKey: "address_id" });
index_1.CustomerGroup.hasMany(Customer, { constraints: true, foreignKey: "customer_group_id" });
Customer.belongsTo(index_1.CustomerGroup, { constraints: true, foreignKey: "customer_group_id" });
index_1.CustomerLOB.hasMany(Customer, { constraints: true, foreignKey: "lob_id" });
Customer.belongsTo(index_1.CustomerLOB, { constraints: true, foreignKey: "lob_id" });
// CustomerSegment.hasMany(Customer, { constraints: true, foreignKey: "customer_segment_id" });
// Customer.belongsTo(CustomerSegment, { constraints: true, foreignKey: "customer_segment_id" });
index_1.BankDetails.hasMany(Customer, { constraints: true, foreignKey: "bank_details_id" });
Customer.belongsTo(index_1.BankDetails, { constraints: true, foreignKey: "bank_details_id" });
index_1.Address.hasMany(Customer, { constraints: true, foreignKey: "shipping_info_id" });
Customer.belongsTo(index_1.Address, { constraints: true, foreignKey: "shipping_info_id" });
exports.default = Customer;
