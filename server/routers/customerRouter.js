const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

router.get("/", customerController.getALL);
router.get("/:id", customerController.getById);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.delete);

module.exports = router;
