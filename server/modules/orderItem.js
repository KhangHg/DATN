const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS orderItem (orderId INT, productId INT, quantity INT)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table orderItem created");
  });
});
