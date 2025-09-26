const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const items = await User.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const item = await User.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "User not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "User not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "User not found" });
    await item.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
