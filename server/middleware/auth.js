const JWT = require("jsonwebtoken");
const customerController = require("../controllers/customerController");
const connection = require("../database/connectDB");

function authUser(req, res, next) {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            "your-secret-key"
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

// function authRole(role) {
//     return (req, res, next) => {
//         if (req.user.role !== role) {
//             res.status(401)
//             return res.send('Not allowed')
//         }

//         next()
//     }
// }

async function authRoleAdmin(req, res, next) {
    try {
        const [rows, fields] = await connection.promise().query("select * from customers where email = ?", [req.user.email]);
        if (rows.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
}

async function authRoleUser(req, res, next) {
    try {
        const [rows, fields] = await connection.promise().query("select * from customers where email = ?", [req.user.email]);
        if (rows.role !== "user") {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in user middelware",
        });
    }
}

module.exports = {
    authUser,
    authRoleAdmin,
    authRoleUser
}