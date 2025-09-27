const AuditLog = require("../models/AuditLog");

exports.getAllAuditLogs = async (req, res) => {
  try {
    const items = await AuditLog.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAuditLog = async (req, res) => {
  try {
    const item = await AuditLog.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAuditLogById = async (req, res) => {
  try {
    const item = await AuditLog.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "AuditLog not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAuditLog = async (req, res) => {
  try {
    const item = await AuditLog.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "AuditLog not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAuditLog = async (req, res) => {
  try {
    const item = await AuditLog.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "AuditLog not found" });
    await item.destroy();
    res.json({ message: "AuditLog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
