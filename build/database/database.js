"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
let database = process.env.database;
let user = process.env.user;
const sequelize = new sequelize_1.Sequelize(`${database}`, `${user}`, process.env.password ? process.env.password : "", {
    dialect: "mysql",
    host: process.env.host,
    logging: false,
    timezone: "+05:30",
    define: {
        timestamps: true,
        // createdAt: "created_at",
        // updatedAt: "updated_at",
        // deletedAt:"deleted_at"
        createdAt: false,
        updatedAt: false,
        deletedAt: false
    },
});
exports.sequelize = sequelize;
sequelize.addHook('beforeDefine', (attributes) => {
    attributes.created_by = {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    };
    attributes.updated_by = {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    };
    attributes.deleted_by = {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    };
    attributes.deleted_at = {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    };
    attributes.created_at = {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    };
    attributes.updated_at = {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
    };
});
