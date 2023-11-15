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
    }
}

module.exports = productController