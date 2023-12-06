const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", orderController.getALL);
router.post("/", orderController.createOrder);
// router.put("/:id", productController.update)
// router.delete("/:id", productController.delete)
// router.put("/", productController.subProduct)

module.exports = router;
