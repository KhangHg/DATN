
require('dotenv').config()

// get the client
const mysql = require("mysql2");
console.log(100000);
console.log(process.env['SOCKET_PATH']);
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: process.env.PASS,
  // database: process.env.DATABASE,
  password: "123456",
  database: "datn",
  multipleStatements: true,
});
connection.connect();
module.exports = connection;
