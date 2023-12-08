import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company} from "../index"

export const VendorTypes = sequelize.define(
  "vendor_types",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sequence_no: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeValidate: async (vendor_types: any) => {
        if (!vendor_types.sequence_no) {
          const lastLob = await VendorTypes.findOne({
            order: [["sequence_no", "DESC"]],
          });
          if (lastLob) {
            const lastId = lastLob.sequence_no;
            const numericPart = parseInt(lastId.slice(3), 10);

            const newId = `VT${(numericPart + 1).toString().padStart(3, "0")}`;
            vendor_types.sequence_no = newId;
          } else {
            vendor_types.sequence_no = "VT001";
          }
        }
      },
    },
    timestamps: true,
  }
);
export default VendorTypes;
