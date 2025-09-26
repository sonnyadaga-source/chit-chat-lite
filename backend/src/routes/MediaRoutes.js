const express = require("express");
const router = express.Router();
const MediaController = require("../controllers/MediaController");

router.get("/", MediaController.getAllMedias);
router.post("/", MediaController.createMedia);
router.get("/:id", MediaController.getMediaById);
router.put("/:id", MediaController.updateMedia);
router.delete("/:id", MediaController.deleteMedia);

module.exports = router;
