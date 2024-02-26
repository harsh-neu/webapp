require("dotenv").config();
module.exports = {

    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER_NAME || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'Chocoslam',
    DB: process.env.DB || 'demoDb',
    dialect: "mysql",
};
