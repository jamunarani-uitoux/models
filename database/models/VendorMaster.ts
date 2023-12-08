import Sequelize from 'sequelize';
import { sequelize } from '../database';

const VendorMaster = sequelize.define("vendor", {
	id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
   name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    status:{
        type: Sequelize.BOOLEAN,
        defaultValue:true
    },
    createdBy:{
        type : Sequelize.INTEGER,
        allowNull: true,
    },
    updatedBy:{
        type : Sequelize.INTEGER,
        allowNull: true,
    },
    deletedAt:{
        type:Sequelize.DATE,
        allowNull: true,
    },
    deletedBy:{
        type:Sequelize.INTEGER,
        allowNull: true,
    }
});

export default VendorMaster;