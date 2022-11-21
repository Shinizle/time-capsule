import { Sequelize } from "sequelize";
import db from "../App/Database.js";
import Users from "./User.js";

const Capsules = db.define('capsules', {
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
    }
}, {
    freezeTableName: true
})

Capsules.belongsTo(Users, { foreignKey: 'user_id' })

export default Capsules;