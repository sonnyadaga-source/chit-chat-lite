const Student = require("../models/Student");

exports.getAllStudents = async (req, res) => {
  try {
    const items = await Student.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const item = await Student.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const item = await Student.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Student not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const item = await Student.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Student not found" });
    await item.update(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const item = await Student.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: "Student not found" });
    await item.destroy();
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
