const express = require("express");
const app = express();
const port = 8081;
const router = express.Router();

const customerController = require("./controllers/getCustomer");

require("./models/customer");

app.get("/get", customerController.getALL);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
