const Media = require("../models/Media");

exports.getAllMedias = async (req, res) => {
  try {
    const items = await Media.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMedia = async (req, res) => {
  try {
    const item = await Media.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMediaById = async (req, res) => {
  try {
    const item = await Media.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Media not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMedia = async (req, res) => {
  try {
    const item = await Media.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Media not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    const item = await Media.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Media not found" });
    await item.destroy();
    res.json({ message: "Media deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
