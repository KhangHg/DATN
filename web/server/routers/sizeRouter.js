const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");

const sizeController = require("../controllers/sizeController");

router.get("/", sizeController.getAll);
router.get("/:size_id", sizeController.getById);
router.post("/", sizeController.create);
router.put("/:size_id", authUser, authRoleAdmin, sizeController.update);
router.delete("/:size_id", authUser, authRoleAdmin, sizeController.delete);

module.exports = router;
