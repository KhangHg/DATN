const express = require("express")
const router = express.Router()

const productController = require("../controllers/productController")

router.get("/", productController.getAll)
router.get("/:product_id", productController.getById)
router.post("/", productController.create)
router.put("/:id", productController.update)
router.delete("/", productController.delete)

module.exports = router