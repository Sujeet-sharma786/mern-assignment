const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  configurationId: {
    type: String,
    required: true,
    unique: true
  },
  matrix: {
    type: [[mongoose.Schema.Types.Mixed]], // 2D array of mixed types
    required: true
  },
  remark: {
    type: String,
    required: false
  }
});

const Configuration = mongoose.model('Configuration', configurationSchema);

module.exports = Configuration;
