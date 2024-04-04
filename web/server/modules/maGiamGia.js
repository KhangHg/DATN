const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS maGiamGia (maId VARCHAR(255), count INT, discount INT)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table maGiamGia created");
  });
});
