const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS cartItem (email VARCHAR(255), productId INT, size VARCHAR(255), quantity INT)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table cartItem created");
  });
});
