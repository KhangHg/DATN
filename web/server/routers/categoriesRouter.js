const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");
const categoriesController = require("../controllers/categoriesController");

router.get("/", /*authUser, authRoleAdmin,*/ categoriesController.getAll);
router.get("/:category_id", categoriesController.getById);
router.post("/", categoriesController.create);
router.put("/:category_id", categoriesController.update);
router.delete("/:category_id", categoriesController.delete);

module.exports = router;
