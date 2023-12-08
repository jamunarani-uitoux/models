import Sequelize from 'sequelize';
import { sequelize } from '../database';

const TableMaster = sequelize.define("table_masters", {
	id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tableName:{
        type: Sequelize.STRING,
        allowNull: false
    },


});

export default TableMaster;