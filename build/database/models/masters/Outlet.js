"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const Company_1 = __importDefault(require("./Company"));
const Region_1 = __importDefault(require("../submasters/Region"));
const Address_1 = __importDefault(require("../submasters/Address"));
const Outlet = database_1.sequelize.define("outlets", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: Company_1.default,
            key: "id"
        }
    },
    // code: {
    //   type: Sequelize.STRING(255),
    //   allowNull: true,
    // },
    name: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    erp_code: {
        type: sequelize_1.default.STRING(100),
        allowNull: true,
    },
    ax_erp_code: {
        type: sequelize_1.default.STRING(100),
        allowNull: true,
    },
    adre_code: {
        type: sequelize_1.default.STRING(100),
        allowNull: true,
    },
    gst_number: {
        type: sequelize_1.default.STRING(100),
        allowNull: true,
    },
    region_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: Region_1.default,
            key: "id"
        }
    },
    type: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    act: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    address_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: Address_1.default,
            key: "id"
        }
    },
    // cost_center_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references:{
    //     model:CostCenter,
    //     key:"id"
    //   }
    // },
    // lob_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references:{
    //     model:CustomerLOB,
    //     key:"id"
    //   }
    // },
    key_user_mapping_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
    },
    shift: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    account_address_set: {
        type: sequelize_1.default.STRING(255),
        allowNull: true,
    },
    // shift_type: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // },
    shift_start_time: {
        type: sequelize_1.default.STRING(10),
        allowNull: true,
    },
    shift_end_time: {
        type: sequelize_1.default.STRING(10),
        allowNull: true,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: true,
    },
}, {
    timestamps: false,
});
Outlet.belongsTo(Region_1.default, { constraints: true, foreignKey: "region_id" });
Outlet.belongsTo(Address_1.default, { constraints: true, foreignKey: "address_id" });
exports.default = Outlet;
