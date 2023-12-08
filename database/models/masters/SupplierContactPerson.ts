import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { SupplierMaster} from "../index"
 
 
export const SupplierContactPerson = sequelize.define(
  "supplier_contact_person",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplier_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    name: {
      type: Sequelize.STRING(255),
    },
    email_id: {
      type: Sequelize.STRING(100),
    },
    mobile_number: {
      type: Sequelize.STRING(100),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    tableName: 'supplier_contact_person'
  },
);
SupplierMaster.hasMany(SupplierContactPerson, { constraints: true, foreignKey: "supplier_id" });
SupplierContactPerson.belongsTo(SupplierMaster, {constraints: true,foreignKey: "supplier_id",});
export default SupplierContactPerson;