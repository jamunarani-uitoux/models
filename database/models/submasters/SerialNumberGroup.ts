import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { AuditLog } from "../AuditLog";
import { Company,State,BusinessUnit,CustomerLOB,EnumeratedValue} from "../index"

export const SerialNumberGroup = sequelize.define(
  "serial_number_group",
  {
    id: {
      type: Sequelize.INTEGER(),
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sequence_number: {
      type: Sequelize.STRING(255),
    },
    financial_year: {
      type: Sequelize.STRING(20),
    },
    state_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    business_unit_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lob_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    outlets_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING(255),
    },
    starting_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ending_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    length: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    next_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    segments: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    values: {
      type: Sequelize.STRING(255),
    },
    display_order: {
      type: Sequelize.STRING(255),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeValidate: async (serialNumberGroup: any) => {
        if (!serialNumberGroup.sequence_number) {
          const lastSerialNumberGroup = await SerialNumberGroup.findOne({
            order: [["sequence_number", "DESC"]],
          });
          if (lastSerialNumberGroup) {
            const lastId = lastSerialNumberGroup.sequence_number;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `SNG${(numericPart + 1).toString().padStart(3, "0")}`;
            serialNumberGroup.sequence_number = newId;
          } else {
            serialNumberGroup.sequence_number = "SNG001";
          }
        }
      },
      
      // afterCreate: async (cost_center: any, instance: any) => {
      //   const dataValuesText = JSON.stringify(cost_center.dataValues);
      //   await AuditLog.create({
      //     action: "create",
      //     userId: 1,
      //     table_name: "cost_center",
      //     recordId: cost_center.dataValues.id,
      //     newData: dataValuesText,
      //   });
      // },
      // afterUpdate: async (cost_center: any, instance: any) => {
      //   if (cost_center._changed && cost_center._changed.size > 1) {
      //     const dataValuesText = JSON.stringify(cost_center.dataValues);
      //     const PreviousDataValuesText = JSON.stringify(
      //       cost_center._previousDataValues
      //     );

      //     /*  await AuditLog.create({
      //       action: 'update',
      //       userId: cost_center.userId,
      //       table_name: 'cost_center',
      //       recordId: cost_center.id,
      //       oldData: dataValuesText,
      //       newData: PreviousDataValuesText,
      //       affectedRows:changedText
      //     }); */
      //   }
      // },
      // afterDestroy: async (cost_center: any, instance: any) => {
      //   await AuditLog.create({
      //     action: "delete",
      //     userId: instance.userId,
      //     tableMaster: "supplier_master",
      //     recordId: instance.id,
      //     oldData: instance.toJSON(),
      //   });
      // },
    },
    timestamps: true,
  }
);
Company.hasMany(SerialNumberGroup, { constraints: true, foreignKey: "company_id" });
SerialNumberGroup.belongsTo(Company, { constraints: true, foreignKey: "company_id" });

State.hasMany(SerialNumberGroup, { constraints: true, foreignKey: "state_id" });
SerialNumberGroup.belongsTo(State, { constraints: true, foreignKey: "state_id" });

BusinessUnit.hasMany(SerialNumberGroup, { constraints: true, foreignKey: "business_unit_id" });
SerialNumberGroup.belongsTo(BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });

CustomerLOB.hasMany(SerialNumberGroup, { constraints: true, foreignKey: "lob_id" });
SerialNumberGroup.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });

EnumeratedValue.hasMany(SerialNumberGroup, { constraints: true, foreignKey: "segments" });
SerialNumberGroup.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "segments" });
export default SerialNumberGroup;
