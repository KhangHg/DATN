const connection = require("../database/connectDB");

const cartController = {
  getById: async (req, res) => {
    try {
      const { email } = req.params;
      const [rows, fields] = await connection.promise().query(
        `SELECT p.name, c.size, c.quantity ,p.description
        FROM cartItem c 
        INNER JOIN products p ON c.productId = p.productId
        where email = ?`,
        [email]
      );
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
  //Thêm product vào card
  create: async (req, res) => {
    try {
      const { productId, quantity, size } = req.body;
      const { email } = req.params;
      const insertSql = "INSERT INTO cartItem (email, productId, size, quantity) VALUES (?, ?, ?, ?)";
      const [rows, fields] = await connection.promise().query(insertSql, [email, productId, size, quantity]);

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
  update: async (req, res) => {
    try {
      const { productId, quantity, size } = req.body;
      const { email } = req.params;
      console.log(count, discount);
      const { id } = req.params;
      console.log(req.params);

      const sql = "UPDATE cartItem SET productId = ?, quantity = ?, size = ?  WHERE email = ?";
      const [rows, fields] = await connection.promise().query(sql, [productId, quantity, size, email]);
      res.json({
        data: rows,
        message: "update success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { productId } = req.body;
      const { email } = req.params;
      const [rows, fields] = await connection.promise().query("delete from cartItem where productId = ? and email = ? ", [productId, email]);
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
};

module.exports = maGiamGiaController;
