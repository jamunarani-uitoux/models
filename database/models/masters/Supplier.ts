import Sequelize from 'sequelize';
import { sequelize } from '../../database';
import {VendorTypes,Address,BankDetails,PaymentMethod,PaymentTerm,CustomerLOB,Company, BusinessUnit } from "../index";
 
 
 
const SupplierMaster = sequelize.define("supplier", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vendor_id: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    vendor_name: {
        type: Sequelize.STRING
    },
    vendor_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vendor_site_id: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    vendor_site_code: {
        type: Sequelize.STRING,
    },
    vendor_type_lookup_code: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ax_vendor_code: {
        type: Sequelize.STRING
    },
    bank_details_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payment_method_code: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payment_term_name: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    legal_entity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    business_unit_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pan_number: {
        type: Sequelize.STRING
    },
    // gst: {
    //     type: Sequelize.STRING
    // },
    gstn: {
        type: Sequelize.STRING
    },
},{
    timestamps: false,
}
);
VendorTypes.hasMany(SupplierMaster, { constraints: true, foreignKey: "vendor_type_lookup_code" });
SupplierMaster.belongsTo(VendorTypes, { constraints: true, foreignKey: "vendor_type_lookup_code" });
Address.hasMany(SupplierMaster, { constraints: true, foreignKey: "address_id" });
SupplierMaster.belongsTo(Address, { constraints: true, foreignKey: "address_id" });
BankDetails.hasMany(SupplierMaster, { constraints: true, foreignKey: "bank_details_id" });
SupplierMaster.belongsTo(BankDetails, { constraints: true, foreignKey: "bank_details_id" });
PaymentMethod.hasMany(SupplierMaster, { constraints: true, foreignKey: "payment_method_code" });
SupplierMaster.belongsTo(PaymentMethod, { constraints: true, foreignKey: "payment_method_code" });
PaymentTerm.hasMany(SupplierMaster, { constraints: true, foreignKey: "payment_term_name" });
SupplierMaster.belongsTo(PaymentTerm, { constraints: true, foreignKey: "payment_term_name" });
Company.hasMany(SupplierMaster, { constraints: true, foreignKey: "legal_entity" });
SupplierMaster.belongsTo(Company, { constraints: true, foreignKey: "legal_entity" });
BusinessUnit.hasMany(SupplierMaster, { constraints: true, foreignKey: "business_unit_id" });
SupplierMaster.belongsTo(BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
 
export default SupplierMaster;