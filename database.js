// const mysql = require("mysql2");
// const dbConfig = require("./src/config/db.config")
// // Open the connection to MySQL server
// const createDb = async()=>{
//     const connection = mysql.createConnection({
//         host: dbConfig.HOST,
//         user: dbConfig.USER,
//         password: dbConfig.PASSWORD,
//       });
      
//       // Run create database statement
//       connection.query(
//         `CREATE DATABASE IF NOT EXISTS demoDb`,
//         function (err, results) {
//           console.log(results);
//           console.log(err);
//         }
//       );
      
//       // Close the connection
//       connection.end();
      
// }
// module.exports = {createDb}
