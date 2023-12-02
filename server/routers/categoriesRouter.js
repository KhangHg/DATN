const express = require("express")
const router = express.Router()
const { authUser, authRoleAdmin, authRoleUser } = require('../middleware/auth')
const categoriesController = require("../controllers/categoriesController")

router.get("/", categoriesController.getAll)
router.get("/:category_id", categoriesController.getById)
router.post("/", authUser, authRoleAdmin, categoriesController.create)
router.put("/:category_id", authUser, authRoleAdmin, categoriesController.update)
router.delete("/:category_id", authUser, authRoleAdmin, categoriesController.delete)

module.exports = router