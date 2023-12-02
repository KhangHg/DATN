const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require('../middleware/auth')

const customerController = require("../controllers/customerController");

router.get("/", authUser, authRoleAdmin, customerController.getALL);
router.get("/:id", authUser, authRoleAdmin, customerController.getById);
router.post("/", customerController.create);
router.put("/:id", authUser, authRoleUser, customerController.update);
router.delete("/:id", authUser, authRoleAdmin, customerController.delete);
router.post("/login", customerController.login);

module.exports = router;
