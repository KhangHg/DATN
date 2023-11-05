const jwt = require("jsonwebtoken");

module.exports.checkLogin = (req, res, next) => {
  try {
    var token = req.cookies.token;
    console.log(token);
    var kq = jwt.verify(token, "your-secret-key");
    console.log("JWT Token:", kq);
    if (kq != undefined) {
      next();
    }
  } catch (error) {
    console.log("Chua dang nhap !");
    res.redirect("/login");
  }
};
