const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");

const customerController = require("../controllers/customerController");

router.get("/", customerController.getALL);
router.get("/:id", customerController.getById);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.delete);
router.post("/login", customerController.loginUser);
router.post("/verify", customerController.verifyToken);

module.exports = router;
