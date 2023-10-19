// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "shopbanhang",
});

connection.connect();

module.exports = connection;
