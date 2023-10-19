const connection = require("../database/connectDB");

const customerController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query("select * from customers");
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = customerController;
