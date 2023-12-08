import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, EnumeratedValue,CustomerLOB, BusinessUnit, CostCenter, Outlet} from "../index"

export const FinancialMapping = sequelize.define(
  "outlet_financial_mapping",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    outlet_id:{
      type:Sequelize.INTEGER,
      references:{
          model:Outlet,
          key:"id"
      }
  },
    business_unit_id:{
        type:Sequelize.INTEGER,
        references:{
            model:BusinessUnit,
            key:"id"
        }
    },
    lob_id:{
        type:Sequelize.INTEGER,
        references:{
            model:CustomerLOB,
            key:"id"
        }
    },
    costcenter_id:{
        type:Sequelize.INTEGER,
        references:{
            model:CostCenter,
            key:"id"
        }
    }

    
  },
);
FinancialMapping.belongsTo(BusinessUnit, { constraints: true, foreignKey: "business_unit_id" });
FinancialMapping.belongsTo(CustomerLOB, { constraints: true, foreignKey: "lob_id" });
FinancialMapping.belongsTo(CostCenter, { constraints: true, foreignKey: "costcenter_id" });
export default FinancialMapping;
