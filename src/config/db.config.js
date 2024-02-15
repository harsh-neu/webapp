require("dotenv").config();
module.exports = {

    HOST: process.env.HOST,
    USER: process.env.USER_NAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB,
    dialect: "mysql",
};
