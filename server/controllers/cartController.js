const connection = require("../database/connectDB");

const cartController = {
  getById: async (req, res) => {
    try {
      const { email } = req.params;
      const [rows, fields] = await connection.promise().query(
        `SELECT p.name, c.size, c.quantity ,p.description,p.imageUrl,p.price,c.productId
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
      let { productId, quantity, size } = req.body;
      const { email } = req.params;

      quantity = parseInt(quantity, 10);

      const selectSql = "SELECT * FROM cartItem WHERE email = ? AND productId = ? AND size = ?";
      const [selectRows, selectFields] = await connection.promise().query(selectSql, [email, productId, size]);

      if (selectRows.length > 0) {
        // Nếu đã tồn tại trong giở hàng thêm quantity vào
        let existingQuantity = selectRows[0].quantity;
        existingQuantity = parseInt(existingQuantity, 10);
        const updatedQuantity = existingQuantity + quantity;

        const updateSql = "UPDATE cartItem SET quantity = ? WHERE email = ? AND productId = ? AND size = ?";
        await connection.promise().query(updateSql, [updatedQuantity, email, productId, size]);

        res.json({
          data: { email, productId, size, quantity: updatedQuantity, errCode: 0 },
          message: "Quantity updated successfully",
        });
      } else {
        // Nếu chưa tồn tại thì thêm vào giỏ hàng
        const insertSql = "INSERT INTO cartItem (email, productId, size, quantity) VALUES (?, ?, ?, ?)";
        const [insertRows, insertFields] = await connection.promise().query(insertSql, [email, productId, size, quantity]);

        res.json({
          data: { errCode: 0 },
          message: "Item added to the cart",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
        message: "An error occurred",
      });
    }
  },

  update: async (req, res) => {
    try {
      const { productId, size } = req.query;
      const { email } = req.params;
      const { quantity } = req.body;

      // Truy vấn để kiểm tra xem dữ liệu tồn tại hay không
      const [checkRows, checkFields] = await connection.promise().query("SELECT * FROM cartItem WHERE productId = ? AND size = ? AND email = ?", [productId, size, email]);

      if (checkRows.length === 0) {
        // Dữ liệu không tồn tại, trả về thông báo lỗi hoặc thực hiện các bước khác theo yêu cầu của bạn.
        res.json({
          state: "error",
          message: "Dữ liệu không tồn tại. Không thể cập nhật.",
        });
        return;
      }

      // Nếu dữ liệu tồn tại, thực hiện truy vấn cập nhật
      const sql = "UPDATE cartItem SET quantity = ? WHERE email = ? AND productId = ? AND size = ?";
      const [rows, fields] = await connection.promise().query(sql, [quantity, email, productId, size]);

      res.json({
        data: { errCode: 0 },
        message: "Update success",
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
      const { productId, size } = req.query;
      const { email } = req.params;
      productId;
      // Truy vấn để kiểm tra xem dữ liệu tồn tại hay không
      const [checkRows, checkFields] = await connection.promise().query("SELECT * FROM cartItem WHERE productId = ? AND size = ? AND email = ?", [productId, size, email]);

      if (checkRows.length === 0) {
        // Dữ liệu không tồn tại, trả về thông báo lỗi hoặc thực hiện các bước khác theo yêu cầu của bạn.
        res.json({
          state: "error",
          message: "Dữ liệu không tồn tại. Không thể xóa.",
        });
        return;
      }

      // Nếu dữ liệu tồn tại, thực hiện truy vấn xóa
      const [rows, fields] = await connection.promise().query("DELETE FROM cartItem WHERE productId = ? AND size = ? AND email = ?", [productId, size, email]);

      res.json({
        data: { data: rows, errCode: 0, message: "Delete success!!" },
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = cartController;
