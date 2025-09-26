const express = require("express");
const router = express.Router();
const SectionController = require("../controllers/SectionController");

router.get("/", SectionController.getAllSections);
router.post("/", SectionController.createSection);
router.get("/:id", SectionController.getSectionById);
router.put("/:id", SectionController.updateSection);
router.delete("/:id", SectionController.deleteSection);

module.exports = router;
