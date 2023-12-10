const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");

const customerController = require("../controllers/customerController");

router.get("/", authUser, authRoleAdmin, customerController.getALL);
router.get("/:id", customerController.getById);
router.post("/", customerController.create);
router.put("/:id", customerController.update);
router.delete("/:id", authUser, authRoleAdmin, customerController.delete);
router.post("/login", customerController.loginUser);
router.post("/verify", customerController.verifyToken);
router.post("/admin/verify", customerController.verifyTokenAdmin);

module.exports = router;
