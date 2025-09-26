// ollamaRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /ollama/ask
router.post('/ask', async (req, res) => {
  try {
    const { prompt, model } = req.body;
    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    const response = await axios.post(`${ollamaUrl}/api/generate`, {
      model: model || 'mistral',
      prompt: prompt || 'Hello!'
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
