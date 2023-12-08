import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, CustomerLOB, EnumeratedValue } from "../index"


export const Model = sequelize.define(
    "model",
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
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: 1,
      },
        code: {
            type: Sequelize.STRING(255),
        },
        name: {
            type: Sequelize.TEXT,
        },
        oem_id: {
            type: Sequelize.INTEGER,
        },
    },
    {
        // hooks: {
        //   beforeValidate: async (model: any) => {
        //     if (!model.sequence_no) {
        //       const lastLob = await Model.findOne({
        //         order: [["sequence_number", "DESC"]],
        //       });
        //       if (lastLob) {
        //         const lastId = lastLob.sequence_number;
        //         const numericPart = parseInt(lastId.slice(3), 10);
    
        //         const newId = `MOD${(numericPart + 1).toString().padStart(3, "0")}`;
        //         model.sequence_number = newId;
        //       } else {
        //         model.sequence_number = "MOD001";
        //       }
        //     }
        //   },
        // },
        timestamps: true,
      }
);
Company.hasMany(Model, { constraints: true, foreignKey: "company_id" });
Model.belongsTo(Company, { constraints: true, foreignKey: "company_id", });
// CustomerLOB.hasMany(Model, { constraints: true, foreignKey: "lob_id" });
// Model.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id", });
// EnumeratedValue.hasMany(Model, { constraints: true, foreignKey: "segments" });
// Model.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "segments", });

// EnumeratedValue.hasMany(Model, { constraints: true, foreignKey: "supplier_id" });
// Model.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "supplier_id", });
// EnumeratedValue.hasMany(Model, { constraints: true, foreignKey: "supplier_id" });
// Model.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "supplier_id", });

export default Model;