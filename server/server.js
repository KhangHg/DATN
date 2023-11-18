const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

//Tạo bảng
require("./modules/customerModule");
require("./modules/maGiamGia");
require("./modules/addressShop");
require("./modules/size");
require("./modules/categories");
require("./modules/product");


//Import router
const customerRouter = require("./routers/customerRouter");
const maGiamGiaRouter = require("./routers/maGiamGiaRouter");
const addressShopRouter = require("./routers/addressShopRouter");
const productRouter = require("./routers/productRouter");

//API
app.use("/customer", customerRouter);
app.use("/maGiamGia", maGiamGiaRouter);
app.use("/address-shop", addressShopRouter);
app.use("/product", productRouter);

app.listen(3000);
