const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS addressshop (addressId INT AUTO_INCREMENT PRIMARY KEY,province VARCHAR(255), address VARCHAR(255), phone INT)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table address-shop created");
  });
});
