import { Sequelize } from "sequelize";
import db from "../App/Database.js";
import Users from "./User.js";

const Capsules = db.define('capsules', {
    title: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    },
    file: {
        type: Sequelize.TEXT
    },
    user_id: {
        type: Sequelize.STRING
    },
    release_time: {
        type: Sequelize.DATE
    },
    is_active: {
        type: Sequelize.BOOLEAN
    }
}, {
    freezeTableName: true
})

Capsules.belongsTo(Users, { foreignKey: 'user_id' })

export default Capsules;