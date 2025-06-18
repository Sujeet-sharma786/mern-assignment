const express = require('express');
const connectDB = require('./db/config');
const Configuration = require('./db/configuration');
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use(cors());


app.get('/api/configurations/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const config = await Configuration.findOne({ configurationId: id });
    if (!config) {
      return res.status(404).json({ message: 'Configuration not found' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/configurations/:id', async (req, res) => {
  const id = req.params.id;
  const { remark } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing id parameter in URL' });
  }

  try {
    const updatedConfig = await Configuration.findOneAndUpdate(
      { configurationId: id },
      { remark: remark },
      { new: true }
    );

    if (!updatedConfig) {
      return res.status(404).json({ message: 'Configuration not found' });
    }

    res.json(updatedConfig);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(5000);
