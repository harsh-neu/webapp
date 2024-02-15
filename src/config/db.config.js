require("dotenv").config();
module.exports = {

    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER_NAME || 'harsh',
    PASSWORD: process.env.DB_PASSWORD || 'harsh',
    DB: process.env.DB || 'demoDb',
    dialect: "mysql",
};
