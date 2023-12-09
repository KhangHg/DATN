const connection = require("../database/connectDB");

const categoriesController = {
  create: async (req, res) => {
    try {
      const { code, province } = req.body;
      const insertSql = "INSERT INTO codeProvince (code, province) VALUES (?, ?)";
      const [rows, fields] = await connection.promise().query(insertSql, [code, province]);

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
module.exports = categoriesController;
