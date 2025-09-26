const express = require("express");
const router = express.Router();
const AuditLogController = require("../controllers/AuditLogController");

router.get("/", AuditLogController.getAllAuditLogs);
router.post("/", AuditLogController.createAuditLog);
router.get("/:id", AuditLogController.getAuditLogById);
router.put("/:id", AuditLogController.updateAuditLog);
router.delete("/:id", AuditLogController.deleteAuditLog);

module.exports = router;
