import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, EnumeratedValue,CustomerLOB, BusinessUnit, CostCenter, Outlet} from "../index"

export const KeyUserMapping = sequelize.define(
  "key_user_mapping",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    role:{
        type:Sequelize.STRING(100),
    },
    ecode:{
        type:Sequelize.STRING(100),
    },
    designation:{
        type:Sequelize.STRING(100),
    },
    name:{
        type:Sequelize.STRING(100),
    },
    email:{
        type:Sequelize.STRING(100),
    },
    mobile_number:{
        type:Sequelize.STRING,
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
    cost_center_id:{
        type:Sequelize.INTEGER,
        references:{
            model:CostCenter,
            key:"id"
        }
    }
  },
);
export default KeyUserMapping;
