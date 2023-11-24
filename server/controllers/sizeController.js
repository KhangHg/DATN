const connection = require("../database/connectDB")

const sizeController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await connection.promise().query(
                `select * from size
            `)
            res.json({
                data: rows,
            })
        } catch (error) {
            console.log(error)
            res.json({
                state: "error",
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { size_id } = req.params;
            const [rows, fields] = await connection.promise().query(`select * from size where sizeId = ?`, [size_id]);
            res.json({
                data: rows,
            });
            // console.log(rows.length);
        } catch (error) {
            console.log(error);
            res.json({
                state: "error",
            });
        }
    },
    create: async (req, res) => {
        try {
            const { name } = req.body;

            const checkNameSql = "select * from size where name = ?"
            const [nameRows, nameFields] = await connection.promise().query(checkNameSql, [name]);

            if (nameRows.length > 0) {
                return res.json({
                    error: "name already exist",
                })
            }

            const query = "insert into size ( name) values (?)";
            const [rows, fields] = await connection.promise().query(query, [name]);
            res.json({
                message: "successful",
                data: rows,
            });

        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    },
    update: async (req, res) => {
        try {
            const { size_id } = req.params;
            console.log("id: " + req.params);

            const { name } = req.body;
            const query = 'UPDATE size SET name = ? WHERE sizeId = ?';

            const [rows, fields] = await connection.promise().query(query, [name, size_id]);
            res.json({
                data: rows,
                message: "update success",
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    },
    delete: async (req, res) => {
        try {
            const { size_id } = req.params;
            const [rows, fields] = await connection.promise().query("delete from size where sizeId = ?", [size_id]);
            res.json({
                message: "successful",
                data: rows,
            });
        } catch (error) {
            console.log(error);
            res.json({
                state: "error"
            });
        }
    }
}

module.exports = sizeController