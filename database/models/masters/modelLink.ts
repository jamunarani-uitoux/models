import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, CustomerLOB, Model, EnumeratedValue } from "../index"

export const ModelLink = sequelize.define(
    "model_link",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        company_id: {
            type: Sequelize.INTEGER(),
            allowNull:false
        },
        sequence_number: {
            type: Sequelize.STRING(255),
        },
        lob_id: {
            type: Sequelize.INTEGER,
        },
        model_id: {
            type: Sequelize.INTEGER,
        },
        fuel_types: {
            type: Sequelize.STRING(255),
        },
        segments: {
            type: Sequelize.INTEGER,
        },
        variant: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
        },
    },
    {
        hooks: {
            beforeValidate: async (modelLink: any) => {
                if (!modelLink.sequence_number) {
                    const lastLob = await ModelLink.findOne({
                        order: [["sequence_number", "DESC"]],
                    });
                    if (lastLob) {
                        const lastId = lastLob.sequence_number;
                        const numericPart = parseInt(lastId.slice(3), 10);

                        const newId = `MOL${(numericPart + 1).toString().padStart(3, "0")}`;
                        modelLink.sequence_number = newId;
                    } else {
                        modelLink.sequence_number = "MOL001";
                    }
                }
            },
        },
        timestamps: true,
    }
);
Company.hasMany(ModelLink, { constraints: true, foreignKey: "company_id" });
ModelLink.belongsTo(Company, { constraints: true, foreignKey: "company_id" });
CustomerLOB.hasMany(ModelLink, { constraints: true, foreignKey: "lob_id" });
ModelLink.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });
Model.hasMany(ModelLink, { constraints: true, foreignKey: "model_id" });
ModelLink.belongsTo(Model, { constraints: true, foreignKey: "model_id" });
EnumeratedValue.hasMany(ModelLink, { constraints: true, foreignKey: "segments" });
ModelLink.belongsTo(EnumeratedValue, { constraints: true, foreignKey: "segments" });

export default ModelLink;
