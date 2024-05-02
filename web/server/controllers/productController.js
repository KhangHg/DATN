const { sign } = require("jsonwebtoken");
const connection = require("../database/connectDB");

const productController = {
  getAllByCategory: async (req, res) => {
    try {
      const { category_id } = req.params;
      const [rows, fields] = await connection.promise().query(
        `SELECT *
        FROM products 
        WHERE
        categoryId = ?
        `,
        [category_id]
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
  getAll: async (req, res) => {
    try {
      const [rows, fields] = await connection.promise().query(
        /*`SELECT p.productId, p.name, p.description, p.price, p.imageUrl, c.name AS categoryName, s.name AS sizeName, d.count AS quantity
            FROM products p
            INNER JOIN categories c ON p.categoryId = c.categoryId
            inner join size s
            inner join productSize d on p.productId = d.productId and s.sizeId = d.sizeId
            `*/
            `SELECT p.productId, p.name, p.description, p.price, p.imageUrl, c.name AS categoryName
            FROM products p
            INNER JOIN categories c ON p.categoryId = c.categoryId
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
  getByIdOld: async (req, res) => {
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
        error: "không thể lấy được sản phẩm",
      });
    }
  },
  getById: async (req, res) => {
    const sql = `
        SELECT 
            p.productId, 
            p.name, 
            p.description, 
            p.price, 
            p.imageUrl, 
            c.name AS categoryName, 
            MAX(CASE WHEN s.name = 'S' THEN d.count ELSE 0 END) AS S,
            MAX(CASE WHEN s.name = 'M' THEN d.count ELSE 0 END) AS M,
            MAX(CASE WHEN s.name = 'L' THEN d.count ELSE 0 END) AS L,
            MAX(CASE WHEN s.name = 'XL' THEN d.count ELSE 0 END) AS XL,
            MAX(CASE WHEN s.name = 'XXL' THEN d.count ELSE 0 END) AS XXL

        FROM 
            products p
            INNER JOIN categories c ON p.categoryId = c.categoryId
            INNER JOIN productSize d ON p.productId = d.productId
            INNER JOIN size s ON d.sizeId = s.sizeId
        WHERE 
            p.productId = ?
        GROUP BY 
            p.productId, 
            p.name, 
            p.description, 
            p.price, 
            p.imageUrl, 
            c.name;
        `;
    try {
      const { product_id } = req.params;
      const [rows, fields] = await connection.promise().query(sql, [product_id]);
      res.json({
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: "không thể lấy được sản phẩm",
      });
    }
  },
  create: async (req, res) => {
    try {
      let { name, description, price, categoryName, imageUrl, XXL, XL, M, L, S } = req.body.name;
      if (S == null) S = 0;
      if (M == null) M = 0;
      if (L == null) L = 0;
      if (XL == null) XL = 0;
      if (XXL == null) XXL = 0;
      const checkNameSql = "select name, categoryId, productId from products where name = ?";
      const categoryIdSql = "select categoryId from categories where name = ?";
      const sizeIdSql = "select sizeId from size where name = ?";

      const [categoryRows, categoryFields] = await connection.promise().query(categoryIdSql, [categoryName]);
      console.log(categoryRows);
      const categoryId = categoryRows[0].categoryId;

      const [nameRows, nameFields] = await connection.promise().query(checkNameSql, [name]);

      if (nameRows.length > 0) {
        const categoryIdProduct = nameRows[0].categoryId;

        if (categoryIdProduct == categoryId) {
          return res.json({
            message: "Sản phẩm đã tồn tại",
            errCode: 1,
          });
        } else {
          return res.json({
            message: "không thể tạo 2 sản phẩm cùng tên nhưng khác thể loại",
            errCode: 1,
          });
        }
      } else {
        const sql1 = `insert into products(name, description, price, categoryId, imageUrl) values (?,?,?,?,?)`;
        const [rows, fields] = await connection.promise().query(sql1, [name, description, price, categoryId, imageUrl]);
        const [rows1, fields1] = await connection.promise().query("select productId from products where name = ? and categoryId = ?", [name, categoryId]);

        const sql2 = `
                INSERT INTO productSize (productId, sizeId, count)
                VALUE (?,?,?)
                `;

        const id = rows1[0].productId;
        const sql3 = `
                START TRANSACTION;

                INSERT INTO productSize (productId, sizeId, count) VALUES
                    (?, (SELECT sizeId FROM size WHERE name = 'S'), ?),
                    (?, (SELECT sizeId FROM size WHERE name = 'M'), ?),
                    (?, (SELECT sizeId FROM size WHERE name = 'L'), ?),
                    (?, (SELECT sizeId FROM size WHERE name = 'XL'), ?),
                    (?, (SELECT sizeId FROM size WHERE name = 'XXL'), ?);
                
                COMMIT;
                `;
        const [Rows, Fields] = await connection.promise().query(sql3, [id, S, id, M, id, L, id, XL, id, XXL]);
        return res.json({
          message: "add product success",
          errCode: 0,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        error: "không thể tạo thành công sản phẩm",
      });
    }
  },
  update: async (req, res) => {
    const sql = `
        START TRANSACTION;

        UPDATE products
        SET name = ?, description = ?,  price = ?,  imageUrl = ?  WHERE productId = ?;

        UPDATE productSize
        SET count =  
            CASE 
                WHEN sizeId = (SELECT sizeId FROM size WHERE name = 'XXL') THEN ?
                WHEN sizeId = (SELECT sizeId FROM size WHERE name = 'XL') THEN ?
                WHEN sizeId = (SELECT sizeId FROM size WHERE name = 'L') THEN ?
                WHEN sizeId = (SELECT sizeId FROM size WHERE name = 'M') THEN ?
                WHEN sizeId = (SELECT sizeId FROM size WHERE name = 'S') THEN ?
                ELSE count
            END
        WHERE productId = ?;
        COMMIT;
        `;

    try {
      const { id } = req.params;
      let { name, description, price, imageUrl, XXL, XL, L, M, S } = req.body;
      console.log(req.body);
      if (S == null) S = 0;
      if (M == null) M = 0;
      if (L == null) L = 0;
      if (XL == null) XL = 0;
      if (XXL == null) XXL = 0;

      const [rows, fields] = await connection.promise().query(sql, [name, description, price, imageUrl, id, XXL, XL, L, M, S, id]);

      res.json({
        message: "update thành công",
        productId: id,
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        XXL: XXL,
        XL: XL,
        L: L,
        M: M,
        S: S,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: "update không thành công",
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
        message: "success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: "xóa sản phẩm không thành công",
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
