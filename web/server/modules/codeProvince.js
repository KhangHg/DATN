const connection = require("../database/connectDB");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS codeProvince (code VARCHAR(255), province VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table codeProvince created");
  });
});
