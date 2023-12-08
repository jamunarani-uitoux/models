import Sequelize from 'sequelize';
import { sequelize } from '../database';
import { isNull } from 'lodash';
import jwt from 'jsonwebtoken';
const User = sequelize.define("user", {
	id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: false
    },
    status:{
        type: Sequelize.BOOLEAN,
        defaultValue:true
    },


});

// User.generateJWT = function (payload:any) {
//     var token = jwt.sign(payload, 'test');
//     return `Bearer ${token}`;
//   };

export default User;
