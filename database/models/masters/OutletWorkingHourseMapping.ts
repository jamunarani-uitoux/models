import Sequelize from "sequelize";
import { sequelize } from "../../database";
import { Company, EnumeratedValue,CustomerLOB, BusinessUnit, CostCenter, Outlet} from "../index"

export const WorkingHoursMapping = sequelize.define(
  "outlet_working_hours_mapping",
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
  shift:{
    type:Sequelize.STRING(200),
  },
  shift_type:{
    type:Sequelize.STRING(200),
  },
  shift_start_time:{
    type:Sequelize.STRING(200),
  },
  shift_end_time:{
    type:Sequelize.STRING(200),
  },
  is_night_shift:{
    type:Sequelize.BOOLEAN,
  }
  },
);

export default WorkingHoursMapping;
