const Section = require("../models/Section");

exports.getAllSections = async (req, res) => {
  try {
    const items = await Section.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSection = async (req, res) => {
  try {
    const item = await Section.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSectionById = async (req, res) => {
  try {
    const item = await Section.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Section not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const item = await Section.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Section not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const item = await Section.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Section not found" });
    await item.destroy();
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
