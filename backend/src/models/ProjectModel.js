const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const ProjectModel = mongoose.model('project', ProjectSchema);

module.exports = ProjectModel;
