const connection = require("../database/connectDB");
const jwt = require("jsonwebtoken");

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const customerController = {
  getALL: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query("select * from customers");
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
      const [rows, fields] = await connection.promise().query("select * from customers where customerId = ?", [id]);
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
      const { name, email, phone, password } = req.body;

      // check format email
      if (!emailRegex.test(email)) {
        return res.json({
          error: "Invalid email format",
        });
      }

      const checkEmailSql = "SELECT * FROM customers WHERE email = ?";
      const [emailRows, emailFields] = await connection.promise().query(checkEmailSql, [email]);

      if (emailRows.length > 0) {
        return res.json({
          error: "Email already exists",
        });
      } else {
        const insertSql = "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)";
        const [rows, fields] = await connection.promise().query(insertSql, [name, email, phone, password]);
        res.json({
          data: rows,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
      const { id } = req.params;
      const sql = "update customers set name = ?,email = ?,phone = ?,password = ? where customerId = ?";
      const [rows, fields] = await connection.promise().query(sql, [name, email, phone, password, id]);
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
      const [rows, fields] = await connection.promise().query("delete from customers where customerId = ?", [id]);
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
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Truy vấn kiểm tra email và mật khẩu
      const [rows] = await connection.promise().query("SELECT * FROM customers WHERE email = ? AND password = ?", [email, password]);

      if (rows.length === 1) {
        // Đăng nhập thành công, tạo JWT
        const customer = {
          email: email,
        };

        const token = jwt.sign(customer, "your-secret-key", {
          expiresIn: "1h", // Thời gian hết hạn của token (vd: 1 giờ)
        });
        console.log("line 111", token);

        res.json({ message: "Login successful", token: token });
      } else {
        // Đăng nhập không thành công
        res.status(401).json({ error: "Login failed" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = customerController;
