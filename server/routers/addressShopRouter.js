const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");

const addressShopController = require("../controllers/addressShopController");

router.get("/", addressShopController.getALL);
router.get("/:id", addressShopController.getById);
router.post("/", authUser, authRoleAdmin, addressShopController.create);
router.put("/:id", authUser, authRoleAdmin, addressShopController.update);
router.delete("/:id", authUser, authRoleAdmin, addressShopController.delete);

module.exports = router;
