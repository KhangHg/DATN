require("dotenv").config()

// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASS,
  database: process.env.DATABASE,
  multipleStatements: true,
});

connection.connect();

module.exports = connection;
