import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { AuditLog } from "../AuditLog";
import { BusinessUnit, Company} from "../index"

export const CostCenter = sequelize.define(
  "cost_center",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    business_unit_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

    code: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    module: {
      type: Sequelize.STRING(100),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      /*  beforeCreate: async (cost_center: any) => {
        if (!cost_center.code) {
          const lastLob = await CostCenter.findOne({
            order: [['code', 'DESC']],
          });
          if (lastLob) {
            const lastId = lastLob.code;
            const numericPart = parseInt(lastId.slice(3), 10);
            const newId = `CC${(numericPart + 1).toString().padStart(3, '0')}`;
            cost_center.code = newId;
          } else {
            cost_center.code = 'CC001';
          }
        }
      }, */
      afterCreate: async (cost_center: any, instance: any) => {
        const dataValuesText = JSON.stringify(cost_center.dataValues);
        await AuditLog.create({
          action: "create",
          userId: 1,
          table_name: "cost_center",
          recordId: cost_center.dataValues.id,
          newData: dataValuesText,
        });
      },
      afterUpdate: async (cost_center: any, instance: any) => {
        if (cost_center._changed && cost_center._changed.size > 1) {
          const dataValuesText = JSON.stringify(cost_center.dataValues);
          const PreviousDataValuesText = JSON.stringify(
            cost_center._previousDataValues
          );

          /*  await AuditLog.create({
            action: 'update',
            userId: cost_center.userId,
            table_name: 'cost_center',
            recordId: cost_center.id,
            oldData: dataValuesText,
            newData: PreviousDataValuesText,
            affectedRows:changedText
          }); */
        }
      },
      afterDestroy: async (cost_center: any, instance: any) => {
        await AuditLog.create({
          action: "delete",
          userId: instance.userId,
          tableMaster: "supplier_master",
          recordId: instance.id,
          oldData: instance.toJSON(),
        });
      },
    },
    timestamps: true,
  }
);
Company.hasMany(CostCenter, { constraints: true, foreignKey: "company_id" });
CostCenter.belongsTo(Company, {constraints: true,foreignKey: "company_id" });

BusinessUnit.hasMany(CostCenter, { constraints: true, foreignKey: "business_unit_id" });
CostCenter.belongsTo(BusinessUnit, {constraints: true,foreignKey: "business_unit_id" });
export default CostCenter;
