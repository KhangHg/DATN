const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
//Tạo bảng
require("./modules/customerModule");
require("./modules/maGiamGia");
require("./modules/addressShop");
require("./modules/size");
require("./modules/categories");
require("./modules/product");
require("./modules/cardItem");
require("./modules/order");
require("./modules/orderItem");
require("./modules/productSize");

//Import router
const customerRouter = require("./routers/customerRouter");
const maGiamGiaRouter = require("./routers/maGiamGiaRouter");
const addressShopRouter = require("./routers/addressShopRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoriesRouter");
const sizeRouter = require("./routers/sizeRouter");
const cartRouter = require("./routers/cartRouter");
const orderRouter = require("./routers/orderRouter");

//API
app.use("/customer", customerRouter);
app.use("/maGiamGia", maGiamGiaRouter);
app.use("/address-shop", addressShopRouter);
app.use("/product", productRouter);
app.use("/size", sizeRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(3000);
