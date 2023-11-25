const express = require("express")
const router = express.Router()

const sizeController = require("../controllers/sizeController")

router.get("/", sizeController.getAll)
router.get("/:size_id", sizeController.getById)
router.post("/", sizeController.create)
router.put("/:size_id", sizeController.update)
router.delete("/:size_id", sizeController.delete)

module.exports = router