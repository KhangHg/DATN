const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");

const productController = require("../controllers/productController");


router.get("/category/:category_id/", productController.getAllByCategory);
router.get("/", productController.getAll);
router.get("/:product_id", productController.getById);
router.get("/old/:product_id/", productController.getByIdOld);
// router.post("/", authUser, authRoleAdmin, productController.create)
router.post("/", authUser, authRoleAdmin, productController.create);
// router.put("/:id", authUser, authRoleAdmin, productController.update)
router.put("/:id", authUser, authRoleAdmin, productController.update);
router.delete("/:id", authUser, authRoleAdmin, productController.delete);
router.put("/", productController.subProduct);

module.exports = router;
