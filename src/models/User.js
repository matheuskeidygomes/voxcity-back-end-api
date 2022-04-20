import { Sequelize } from 'sequelize';
import { database } from '../instances/mysql.js';

export const User = database.define("User", {

    id: {   
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    experience: {
        type: Sequelize.STRING,
    }

}, {

    tableName: 'users',
    timestamps: false
});

