import { Sequelize } from "sequelize";
import db from "../App/Database.js";

const Users = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    refresh_token: {
        type: Sequelize.TEXT
    },
}, {
    freezeTableName: true
})

export default Users;