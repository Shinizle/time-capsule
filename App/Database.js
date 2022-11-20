import {Sequelize} from "sequelize";

const  db = new Sequelize('time_capsule', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default  db;