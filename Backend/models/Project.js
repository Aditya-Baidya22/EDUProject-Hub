// DATABASE ADMIN (Samrat): MongoDB schema for Project collection
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  teamName: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubLink: String,
  teamMembers: [String],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Project', projectSchema);
