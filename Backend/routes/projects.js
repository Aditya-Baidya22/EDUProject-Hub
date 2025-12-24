// BACKEND DEVELOPER (Aditya): REST API endpoints for projects
// FRONTEND-BACKEND LINK: These endpoints connect to React frontend
// DATABASE ADMIN (Samrat): All operations use MongoDB Project model

const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// GET /api/projects - Get all projects (Home/Projects pages)
router.get('/', async (req, res) => {
  try {
    // Support limit query param for Home page (recent 4 projects)
    const limit = parseInt(req.query.limit) || 20;
    const projects = await Project.find().sort({ createdAt: -1 }).limit(limit);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects/:id - Single project details (ProjectDetails page)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/projects - Submit new project (SubmitProject page)
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
