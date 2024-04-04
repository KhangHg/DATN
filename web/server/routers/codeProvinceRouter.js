const express = require("express");
const router = express.Router();

const codeProvinceController = require("../controllers/codeProvinceController");

// router.get("/", addressShopController.getALL);
// router.get("/:id", addressShopController.getById);
router.post("/", codeProvinceController.create);
// router.put("/:id", authUser, authRoleAdmin, addressShopController.update);
// router.delete("/:id", authUser, authRoleAdmin, addressShopController.delete);

module.exports = router;
