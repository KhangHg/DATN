const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const { authRoleUser, authUser } = require("../middleware/auth");

router.get("/:email", cartController.getById);
router.post("/:email", authUser, authRoleUser, cartController.create);
router.put("/:email", cartController.update);
router.delete("/:email", cartController.delete);

module.exports = router;
