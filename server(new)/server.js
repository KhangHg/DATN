const express = require("express");
const app = express();

//Tạo bảng
require("./modules/customerModule");

//Router
const customerRouter = require("./routers/customerRouter");

app.get("/", function (req, res) {
  res.send("Hello World");
});

//API
app.use("/customer", customerRouter);

app.listen(3000);
