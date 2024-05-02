const JWT = require("jsonwebtoken");
const customerController = require("../controllers/customerController");
const connection = require("../database/connectDB");

function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    console.log("line 8", token);
    if (token) {
      const decode = JWT.verify(token, "your-secret-key");
      console.log("line 11:", decode);
      req.user = decode;
      next();
    } else {
      res.json({
        message: "Chưa đăng nhập!",
        errCodeCheckLogin: 1,
      });
    }
  } catch (error) {
    console.log("auth: "+error);
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
    if (rows[0].role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
        errCodeCheckLogin: 1,
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
    if (rows[0].role !== "user") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
        errCodeCheckLogin: 1,
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
  authRoleUser,
};
