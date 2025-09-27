const Absence = require("../models/Absence");

exports.getAllAbsences = async (req, res) => {
  try {
    const items = await Absence.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAbsence = async (req, res) => {
  try {
    const item = await Absence.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAbsenceById = async (req, res) => {
  try {
    const item = await Absence.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Absence not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAbsence = async (req, res) => {
  try {
    const item = await Absence.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Absence not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAbsence = async (req, res) => {
  try {
    const item = await Absence.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Absence not found" });
    await item.destroy();
    res.json({ message: "Absence deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
