// backend/src/routes/studentRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Student routes working!' });
});

module.exports = router;
