const connection = require("../database/connectDB")

const productController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await connection.promise().query("select * from products")
            res.json({
                data: rows,
            })
        } catch (error) {
            console.log(error)
            res.json({
                state: "error",
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { product_id } = req.params;
            const [rows, fields] = await connection.promise().query("select * from products where product_id = ?", [product_id]);
            res.json({
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error",
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name, description, price, categoryId, sizeId, quantity, imageUrl } = req.body;

            const checkNameSql = "select * from products where name = ?"
            const [nameRows, nameFields] = await connection.promise().query(checkNameSql, [name]);

            if (nameRows.length > 0) {
                return res.json({
                    error: "name already exist",
                })
            }

            const query = "insert into products ( name, description, price, categoryId, sizeId, quantity, imageUrl) values (?,?,?,?,?,?,?)";
            const [rows, fields] = await connection.promise().query(query, [name, description, price, categoryId, sizeId, quantity, imageUrl]);
            res.json({
                message: "successful",
                data: rows,
            });

        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params.id;
            console.log("id: " + req.params);

            const { name, description, price, categoryId, sizeId, quantity, imageUrl } = req.body;
            const query = 'UPDATE products SET name = ?, description = ?, price = ?, categoryId = ?, sizeId = ?, quantity = ?, imageUrl = ? WHERE productId = ?';

            const [rows, fields] = await connection.promise().query(query, [name, description, price, categoryId, sizeId, quantity, imageUrl, id]);
            res.json({
                data: rows,
                message: "update success",
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const [rows, fields] = await connection.promise().query("delete from products where productId = ?", [id]);
            res.json({
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    }
}

module.exports = productController