const connection = require("../database/connectDB");

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS products (productId INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), description VARCHAR(255), price DECIMAL(10,2), categoryId INT, sizeId INT,quantity INT,  imageUrl VARCHAR(255),  FOREIGN KEY (categoryId) REFERENCES categories(categoryId),  FOREIGN KEY (sizeId) REFERENCES size(sizeId))";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table products created");
    });
});
