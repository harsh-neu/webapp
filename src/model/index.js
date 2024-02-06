const dbConfig = require('../config/db.config');

const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,
   {
    dialect:dbConfig.dialect,
    host:dbConfig.HOST
   }
)

const connectDb = async()=>{
    const message = sequelize.authenticate()
    .then(()=>{
        return "connected";
    })
    .catch(err=>{
        return "error";
    });
    return message;
}
connectDb();
const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize,DataTypes);

//if we keep it as trueit will recreate tables
db.sequelize.sync({force:false})
.then(()=>{
    console.log('resynced');
})

module.exports = {db,connectDb};
