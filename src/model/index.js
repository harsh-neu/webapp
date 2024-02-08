const dbConfig = require('../config/db.config');
const mysql = require('mysql2/promise');
const {Sequelize,DataTypes} = require('sequelize');


initialize();

async function initialize() {
    // create db if it doesn't already exist
   
    const connection = await mysql.createConnection({user:dbConfig.USER,password:dbConfig.PASSWORD,host:dbConfig.HOST,port:'3306'} );
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);
}
   
        // (await mysql.createConnection({
        //     user     : dbConfig.USER,
        //     password : dbConfig.PASSWORD,
        // }).then((connection) => {
        //     connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`).then(() => {
        //         // Safe to use sequelize now
        //     })
        // }))()
    
  
    
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
