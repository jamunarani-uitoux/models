import Sequelize from 'sequelize';
import { sequelize } from '../../database';

import { Address, OrganizationType, CustomerGroup, CustomerSegment, BankDetails, CustomerLOB, Company } from "../index";

const Customer = sequelize.define("customer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  organization_type_id: {
    type: Sequelize.INTEGER,
  },
  dms_customer_number: {
    type: Sequelize.STRING(255),
  },
  prefix: {
    type: Sequelize.STRING(20),
    // defaultValue: "Mr"
  },
  first_name: {
    type: Sequelize.STRING(255),
  },
  middle_name: {
    type: Sequelize.STRING(255),
  },
  last_name: {
    type: Sequelize.STRING(255),
  },
  pan_number: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  gst_number: {
    type: Sequelize.STRING(255),
  },
  account_established: {
    type: Sequelize.DATEONLY,
    // defaultValue: Sequelize.fn('STR_TO_DATE', '01/01/2000', '%d/%m/%Y')
  },
  address_id: {
    type: Sequelize.INTEGER,
  },
  account_address_set: {
    type: Sequelize.STRING(255),
  },
  customer_group_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  customer_segment_id: {
    type: Sequelize.STRING(255),
  },
  lob_id: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  sales_executive: {
    type: Sequelize.STRING(255),
  },
  cross_billing: {
    type: Sequelize.STRING(10),
  },
  customer_type: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  oracle_customer_code: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  bank_details_id: {
    type: Sequelize.INTEGER
  },
  shipping_info_id: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1
  },
  email: {
    type: Sequelize.STRING,
    defaultValue: 1
  },
  mobile_no: {
    type: Sequelize.STRING,
    defaultValue: 1
  },
}, {
  timestamps: false,

}
);
Company.hasMany(Customer, { constraints: true, foreignKey: "company_id" });
Customer.belongsTo(Company, { constraints: true, foreignKey: "company_id" });
OrganizationType.hasMany(Customer, { constraints: true, foreignKey: "organization_type_id" });
Customer.belongsTo(OrganizationType, { constraints: true, foreignKey: "organization_type_id" });
Address.hasMany(Customer, { constraints: true, foreignKey: "address_id" });
Customer.belongsTo(Address, { constraints: true, foreignKey: "address_id" });
CustomerGroup.hasMany(Customer, { constraints: true, foreignKey: "customer_group_id" });
Customer.belongsTo(CustomerGroup, { constraints: true, foreignKey: "customer_group_id" });
CustomerLOB.hasMany(Customer, { constraints: true, foreignKey: "lob_id" });
Customer.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });
// CustomerSegment.hasMany(Customer, { constraints: true, foreignKey: "customer_segment_id" });
// Customer.belongsTo(CustomerSegment, { constraints: true, foreignKey: "customer_segment_id" });
BankDetails.hasMany(Customer, { constraints: true, foreignKey: "bank_details_id" });
Customer.belongsTo(BankDetails, { constraints: true, foreignKey: "bank_details_id" });
Address.hasMany(Customer, { constraints: true, foreignKey: "shipping_info_id" });
Customer.belongsTo(Address, { constraints: true, foreignKey: "shipping_info_id" });
export default Customer;