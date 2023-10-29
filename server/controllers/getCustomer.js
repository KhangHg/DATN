const connection = require("../database/conectionDB");

const customerController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.query("select * from customers");
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = customerController;
