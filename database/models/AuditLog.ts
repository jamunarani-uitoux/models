import Sequelize from 'sequelize';
import { sequelize } from '../database';

export const AuditLog = sequelize.define("auditLogs", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    action: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    table_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    oldData: {
        type: Sequelize.TEXT,
    },
    newData: {
        type: Sequelize.TEXT,
    },
    affectedRows: {
        type: Sequelize.TEXT,
    },
}

);
export default AuditLog;
