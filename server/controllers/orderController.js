const connection = require("../database/connectDB");

const orderController = {
  getAll: async (req, res) => {
    try {
      // Lấy tất cả các đơn hàng kèm theo thông tin orderItem
      const [rows, fields] = await connection.promise().query("SELECT o.id as orderId, o.*, i.* FROM `order` o INNER JOIN orderItem i ON o.id = i.orderId");

      // Tạo một đối tượng để lưu trữ thông tin đơn hàng
      const orderDataMap = {};

      // Lặp qua kết quả truy vấn để xử lý dữ liệu
      rows.forEach((row) => {
        const orderId = row.orderId;

        // Nếu order chưa được thêm vào orderDataMap, thêm nó vào
        if (!orderDataMap[orderId]) {
          console.log(row);
          let statusValue = null;

          // Kiểm tra xem status có phải là Buffer không
          if (Buffer.isBuffer(row.status)) {
            // Nếu là Buffer, trích xuất giá trị từ mảng byte
            statusValue = row.status.length > 0 ? row.status[0] : null;
          } else if (Array.isArray(row.status) && row.status.length > 0) {
            // Nếu status là một mảng, lấy giá trị đầu tiên
            statusValue = row.status[0];
          } else {
            // Nếu không phải là Buffer hoặc mảng, giữ nguyên giá trị
            statusValue = row.status;
          }
          orderDataMap[orderId] = {
            order: {
              id: row.orderId,
              email: row.email,
              name: row.name,
              address: row.address,
              phone: row.phone,
              total: row.total,
              orderDate: row.orderDate,
              status: statusValue,
            },
            orderItems: [], // Khởi tạo orderItems là một mảng rỗng
          };
        }

        // Thêm thông tin orderItem vào mảng orderItems của đơn hàng tương ứng
        orderDataMap[orderId].orderItems.push({
          productId: row.productId,
          productName: row.productName,
          quantity: row.quantity,
          size: row.size,
          additionalInfo: row.additionalInfo,
        });
      });

      // Chuyển đối tượng orderDataMap thành mảng để trả về
      const data = Object.values(orderDataMap);

      res.json({
        data: data,
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
        const insertOrderSql = "INSERT INTO `order` (email,name, phone,  status, address,total) VALUES (?, ?, ?, ?, ?, ?)";
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
