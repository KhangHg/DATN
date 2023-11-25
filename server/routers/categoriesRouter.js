const express = require("express")
const router = express.Router()

const categoriesController = require("../controllers/categoriesController")

router.get("/", categoriesController.getAll)
router.get("/:category_id", categoriesController.getById)
router.post("/", categoriesController.create)
router.put("/:category_id", categoriesController.update)
router.delete("/:category_id", categoriesController.delete)

module.exports = router