const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS customers (customerId INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), email VARCHAR(255), phone INT,password VARCHAR(255), role VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table customers created");
  });
});
