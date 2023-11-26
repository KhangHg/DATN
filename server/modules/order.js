const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS `order` (id INT AUTO_INCREMENT PRIMARY KEY, email INT, address VARCHAR(255), phone INT, orderDate DATE,status BIT)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table order created");
  });
});
