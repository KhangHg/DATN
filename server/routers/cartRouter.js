const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require("../middleware/auth");
const cartController = require("../controllers/cartController");

router.get("/:email", authUser, authRoleUser, cartController.getById);
router.post("/:email", authUser, authRoleUser, cartController.create);
router.put("/:email", authUser, authRoleUser, cartController.update);
router.delete("/:email", authUser, authRoleUser, cartController.delete);

module.exports = router;
