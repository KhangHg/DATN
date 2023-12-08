const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", orderController.getAll);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateStatus)
router.get("/:id", orderController.getDetailOrder)
// router.delete("/:id", productController.delete)
// router.put("/", productController.subProduct)

module.exports = router;
