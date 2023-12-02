const { sign } = require("jsonwebtoken");
const connection = require("../database/connectDB");

const productController = {
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query(
        `SELECT p.productId, p.name, p.description, p.price, p.imageUrl, c.name AS categoryName, s.name AS sizeName, d.count AS quantity
            FROM products p
            INNER JOIN categories c ON p.categoryId = c.categoryId
            inner join size s
            inner join productSize d on p.productId = d.productId and s.sizeId = d.sizeId
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
  getById: async (req, res) => {
    try {
      const { product_id } = req.params;
      const [rows, fields] = await connection.promise().query(
        `SELECT p.productId, p.name, p.description, p.price, p.imageUrl, c.name AS categoryName, s.name AS sizeName, d.count AS quantity
            FROM products p
            INNER JOIN categories c ON p.categoryId = c.categoryId
            inner join size s
            inner join productSize d on p.productId = d.productId and s.sizeId = d.sizeId
            where p.productId = ?
            `,
        [product_id]
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
  create: async (req, res) => {
    try {
      const { name, description, price, category, size, quantity, imageUrl } = req.body;

      const checkNameSql = "select name, categoryId, productId from products where name = ?";
      const categoryIdSql = "select categoryId from categories where name = ?";
      const sizeIdSql = "select sizeId from size where name = ?";

      const [categoryRows, categoryFields] = await connection.promise().query(categoryIdSql, [category]);
      const categoryId = categoryRows[0].categoryId;

      const [sizeRows, sizeFields] = await connection.promise().query(sizeIdSql, [size]);
      const sizeId = sizeRows[0].sizeId;

      const [nameRows, nameFields] = await connection.promise().query(checkNameSql, [name]);

      if (nameRows.length > 0) {
        const categoryIdProduct = nameRows[0].categoryId;

        if (categoryIdProduct == categoryId) {
          const productId = nameRows[0].productId;
          const nameProduct = nameRows[0].name;

          const checkSizeSql = `select * from productSize where productId = ? and sizeId = ? `;
          const [checkSizeRows, checkSizeFieds] = await connection.promise().query(checkSizeSql, [productId, sizeId]);

          if (checkSizeRows.length > 0) {
            const sql = `
                        UPDATE productSize
                         set count = count + ?
                         where productId = ? and sizeId = ?
                        `;
            const [Rows, Fields] = await connection.promise().query(sql, [quantity, productId, sizeId]);
            return res.json({
              message: "update product success",
            });
          } else {
            const sql = `
                        INSERT INTO productSize (productId, sizeId, count)
                        VALUE (?,?,?)
                        `;
            const [Rows, Fields] = await connection.promise().query(sql, [productId, sizeId, quantity]);
            return res.json({
              message: "add product success",
            });
          }
        } else {
          return res.json({
            message: "không thể tạo 2 sản phẩm cùng tên nhưng khác thể loại",
          });
        }
      } else {
        const sql1 = `insert into products(name, description, price, categoryId, imageUrl) values (?,?,?,?,?)`;
        const [rows, fields] = await connection.promise().query(sql1, [name, description, price, categoryId, imageUrl]);
        const [rows1, fields1] = await connection.promise().query("select productId from products where name = ? and categoryId = ?", [name, categoryId]);
        const id = rows1[0].productId;

        const sql2 = `
                    INSERT INTO productSize (productId, sizeId, count)
                    VALUE (?,?,?)
                    `;
        const [Rows, Fields] = await connection.promise().query(sql2, [id, sizeId, quantity]);
        return res.json({
          message: "add product success",
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
      const { id } = req.params.id;
      console.log("id: " + req.params);

      const { name, description, price, quantity, imageUrl } = req.body;
      const query = "UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ? WHERE productId = ?";

      const [rows, fields] = await connection.promise().query(query, [name, description, price, quantity, imageUrl, id]);
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
      const [rows1, fields1] = await connection.promise().query("delete from productSize where productId = ?", [id]);
      const [rows, fields] = await connection.promise().query(
        `
            delete from products where productId = ?
            `,
        [id]
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
  subProduct: async (req, res) => {
    try {
      const { name, size, quantity } = req.body;

      const sizeIdSql = "select sizeId from size where name = ?";
      const [sizeRows, sizeFields] = await connection.promise().query(sizeIdSql, [size]);
      const sizeId = sizeRows[0].sizeId;

      const checkNameSql = "select * from products where name = ?";
      const [nameRows, nameFields] = await connection.promise().query(checkNameSql, [name]);
      const productId = nameRows[0].productId;

      const sql = `select count from productsize where productId = ? and sizeId = ?`;
      const [row, field] = await connection.promise().query(sql, [productId, sizeId]);
      const count = row[0].count;

      if (quantity < 0 || quantity > count) {
        return res.json({
          state: "error",
        });
      }

      const sql1 = `update productsize set count = count - ? where productId = ? and sizeId = ?`;
      const [row1, field1] = await connection.promise().query(sql1, [quantity, productId, sizeId]);
      res.json({
        message: "sub product successfull",
      });
    } catch (error) {
      console.log(error);
      res.json({
        state: "error",
      });
    }
  },
};

module.exports = productController;
