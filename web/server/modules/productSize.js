const connection = require("../database/connectDB");

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    var sql = `CREATE TABLE IF NOT EXISTS productSize 
    (productSizeId INT PRIMARY KEY AUTO_INCREMENT, 
    productId INT, sizeId INT, count INT,
    FOREIGN KEY (productId) REFERENCES products(productId),
    FOREIGN KEY (sizeId) REFERENCES size (sizeId) )`;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table productSize created");
    });
});