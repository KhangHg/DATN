const connection = require("../database/connectDB");

const orderController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query("select *  FROM `order` ORDER BY status ASC, id DESC");
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
  getDetailOrder: async (req, res) => {
    const id = req.params.id.split("=")[1];
    try {
      const [rows, fields] = await connection.promise().query("select o.*, p.name productName, p.price, p.imageUrl, oi.quantity, oi.size FROM `order` o INNER JOIN `orderItem` oi ON o.id = oi.orderId  LEFT JOIN `products` p ON p.productId = oi.productId where o.id = ?", [id]);
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
      const { email, name, phone, status, address, total, items } = req.body;

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
        const insertOrderSql = "INSERT INTO `order` (email, name, phone,  status, address,total) VALUES (?, ?, ?, ?, ?, ?)";
        const [orderRows, orderFields] = await connection.promise().query(insertOrderSql, [email, name, phone, status, address, total]);

        const orderId = orderRows.insertId;

        // Thực hiện chèn các mục đơn hàng vào bảng 'orderItem' với orderId liên quan
        const insertOrderItemSql = "INSERT INTO orderItem (orderId, productId, quantity,size) VALUES (?, ?, ?,?)";
        for (const item of items) {
          await connection.promise().query(insertOrderItemSql, [orderId, item.productId, item.quantity, item.size]);
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
            errCode: 0,
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
      const id = req.params.id.split("=")[1];
      console.log(id);

      // Kiểm tra xem status có giá trị hợp lệ (0 hoặc 1) không
      if (status !== 0 && status !== 1) {
        return res.json({
          status: false,
          error: "Invalid status value",
        });
      }

      const sql = "UPDATE `order` SET status = ? WHERE id = ?";
      const [rows, fields] = await connection.promise().query(sql, [status, id]);

      res.json({
        status: true,
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
