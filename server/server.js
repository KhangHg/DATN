const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

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
