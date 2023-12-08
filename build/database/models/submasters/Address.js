"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const database_1 = require("../../database");
const State_1 = __importDefault(require("./State"));
const Region_1 = __importDefault(require("./Region"));
const Country_1 = __importDefault(require("./Country"));
const City_1 = __importDefault(require("./City"));
const District_1 = __importDefault(require("./District"));
const Address = database_1.sequelize.define("addresses", {
    id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    line_1: {
        type: sequelize_1.default.STRING,
    },
    line_2: {
        type: sequelize_1.default.STRING,
    },
    line_3: {
        type: sequelize_1.default.STRING,
    },
    city_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: City_1.default,
            key: "id",
        }
    },
    district_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: District_1.default,
            key: "id",
        }
    },
    state_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: State_1.default,
            key: "id"
        }
    },
    region_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: Region_1.default,
            key: "id"
        }
    },
    country_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        references: {
            model: Country_1.default,
            key: "id"
        }
    },
    pin_code: {
        type: sequelize_1.default.INTEGER,
        // allowNull: true,
    },
    address_set: {
        type: sequelize_1.default.TEXT,
    },
    entity_type: {
        type: sequelize_1.default.STRING,
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: 1
    },
}, {
    timestamps: true
});
Address.belongsTo(State_1.default, { constraints: true, foreignKey: "state_id" });
Address.belongsTo(Region_1.default, { constraints: true, foreignKey: "region_id" });
Address.belongsTo(Country_1.default, { constraints: true, foreignKey: "country_id" });
Address.belongsTo(City_1.default, { constraints: true, foreignKey: "city_id" });
Address.belongsTo(District_1.default, { constraints: true, foreignKey: "district_id" });
exports.default = Address;
