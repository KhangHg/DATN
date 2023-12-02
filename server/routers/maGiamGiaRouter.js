const express = require("express");
const router = express.Router();
const { authUser, authRoleAdmin, authRoleUser } = require('../middleware/auth')

const maGiamGiaController = require("../controllers/maGiamGiaController");

router.get("/", maGiamGiaController.getALL);
router.get("/:maId", maGiamGiaController.getById);
router.post("/", authUser, authRoleAdmin, maGiamGiaController.create);
router.put("/:id", authUser, authRoleAdmin, maGiamGiaController.update);
router.delete("/:id", authUser, authRoleAdmin, maGiamGiaController.delete);

module.exports = router;
