const connection = require("../database/connectDB");

const orderController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query(
        `select * 
        FROM order o
        INNER JOIN  orderItem i ON o.id = i.orderId
        `
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
  createOrder: async (req, res) => {
    try {
      const { email, phone, orderdate, status, address, items } = req.body;

      // Kiểm tra xem items có tồn tại và không rỗng
      if (!items || items.length === 0) {
        return res.json({
          error: "Order must have at least one item",
        });
      }

      // Bắt đầu một giao dịch để đảm bảo tính toàn vẹn dữ liệu
      await connection.promise().beginTransaction();

      try {
        // Thực hiện chèn đơn đặt hàng vào bảng 'order'
        const insertOrderSql = "INSERT INTO `order` (email, phone, orderdate, status, address) VALUES (?, ?, ?, ?, ?)";
        const [orderRows, orderFields] = await connection.promise().query(insertOrderSql, [email, phone, orderdate, status, address]);

        const orderId = orderRows.insertId;

        // Thực hiện chèn các mục đơn hàng vào bảng 'orderItem' với orderId liên quan
        const insertOrderItemSql = "INSERT INTO orderItem (orderId, productId, quantity) VALUES (?, ?, ?)";
        for (const item of items) {
          await connection.promise().query(insertOrderItemSql, [orderId, item.productId, item.quantity]);
        }

        // Xóa các cartItem có email tương ứng
        const deleteCartItemSql = "DELETE FROM cartItem WHERE email = ?";
        await connection.promise().query(deleteCartItemSql, [email]);

        // Commit giao dịch nếu mọi thứ thành công
        await connection.promise().commit();

        res.json({
          data: {
            orderId: orderId,
            message: "Order created successfully",
          },
        });
      } catch (error) {
        // Rollback giao dịch nếu có lỗi
        await connection.promise().rollback();
        throw error;
      }
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
        message: "An error occurred while creating the order",
      });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;

      // Kiểm tra xem status có giá trị hợp lệ (0 hoặc 1) không
      if (status !== 0 && status !== 1) {
        return res.json({
          error: "Invalid status value",
        });
      }

      const sql = "UPDATE `order` SET status = ? WHERE id = ?";
      const [rows, fields] = await connection.promise().query(sql, [status, id]);

      res.json({
        data: rows,
        message: "Update status success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = orderController;
