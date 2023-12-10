const connection = require("../database/connectDB");

const addressShopController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query("select * from addressshop");
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
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await connection.promise().query("select * from addressshop where addressId = ?", [id]);
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
      const { province, address, phone } = req.body;
      const insertSql = "INSERT INTO addressshop (province, address, phone) VALUES (?, ?, ?)";
      const [rows, fields] = await connection.promise().query(insertSql, [province, address, phone]);

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
      const { district, ward, phone } = req.body;
      const { id } = req.params;
      const sql = "update addressshop set district = ?,ward = ?,phone = ? where addressId = ?";
      const [rows, fields] = await connection.promise().query(sql, [district, ward, phone, id]);
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
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [rows, fields] = await connection.promise().query("delete from addressshop where addressId = ?", [id]);
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

module.exports = addressShopController;
