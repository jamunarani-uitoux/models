import Sequelize from "sequelize";
import { sequelize } from "../../database";

const CustomerSegment = sequelize.define("customer_segment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(255),
  },
  type: {
    type: Sequelize.STRING(255),
  },
  description: {
    type: Sequelize.STRING(255),
  },
  status: {
    type: Sequelize.BOOLEAN(),
  },
});

export default CustomerSegment;
