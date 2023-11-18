const express = require("express");
const router = express.Router();

const maGiamGiaController = require("../controllers/maGiamGiaController");

router.get("/", maGiamGiaController.getALL);
router.get("/:maId", maGiamGiaController.getById);
router.post("/", maGiamGiaController.create);
router.put("/:id", maGiamGiaController.update);
router.delete("/:id", maGiamGiaController.delete);

module.exports = router;
