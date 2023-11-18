const express = require("express");
const router = express.Router();

const addressShopController = require("../controllers/addressShopController");

router.get("/", addressShopController.getALL);
router.get("/:id", addressShopController.getById);
router.post("/", addressShopController.create);
router.put("/:id", addressShopController.update);
router.delete("/:id", addressShopController.delete);

module.exports = router;
