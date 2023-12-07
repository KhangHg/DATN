const JWT = require("jsonwebtoken");
const customerController = require("../controllers/customerController");
const connection = require("../database/connectDB");

function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("line9 token:", token);
    const decode = JWT.verify(token, "your-secret-key");

    console.log("line10 decode:", decode);
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
    console.log("line 53", req.user.email);
    const [rows, fields] = await connection.promise().query("select * from customers where email = ?", [req.user.email]);
    console.log("line 55", rows[0].role);
    if (rows[0].role !== "user") {
      console.log("..............----------------");
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      console.log("..............");
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
  authRoleUser,
};
