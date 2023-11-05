const connection = require("../database/connectDB");

const maGiamGiaController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query("select * from maGiamGia");
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
      const { maId } = req.params;
      const [rows, fields] = await connection.promise().query("select * from maGiamGia where maId = ?", [maId]);
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
      const { maId, count, discount } = req.body;

      // Check trùng maId
      const checkMaIdSql = "SELECT * FROM maGiamGia WHERE maId = ?";
      const [maIdRows, maIdFields] = await connection.promise().query(checkMaIdSql, [maId]);

      if (maIdRows.length > 0) {
        return res.json({
          error: "maId already exists",
        });
      }

      // Kiểm tra giá trị của count và discount
      if (count < 0 || discount < 0 || discount > 100) {
        return res.json({
          error: "Invalid count or discount values",
        });
      }

      const insertSql = "INSERT INTO maGiamGia (maId, count, discount) VALUES (?, ?, ?)";
      const [rows, fields] = await connection.promise().query(insertSql, [maId, count, discount]);

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
      const { count, discount } = req.body;
      console.log(count, discount);
      const { id } = req.params;
      console.log(req.params);

      // Kiểm tra giá trị của count và discount
      if (count < 0 || discount < 0 || discount > 100) {
        return res.json({
          error: "Invalid count or discount values",
        });
      }

      const sql = "UPDATE maGiamGia SET count = ?, discount = ? WHERE maId = ?";
      const [rows, fields] = await connection.promise().query(sql, [count, discount, id]);
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
      const { id } = req.params;
      const [rows, fields] = await connection.promise().query("delete from maGiamGia where maId = ?", [id]);
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
