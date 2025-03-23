const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const slugify = require('slugify');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques à partir du répertoire src/assets/img
app.use('/assets/img', express.static(path.join(__dirname, '../src/assets/img')));

mongoose.connect('mongodb://localhost:27017/portfolio');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  context: String,
  created: { type: String, required: true }, // Format: YYYY-MM
  projectDuty: String,
  support: String,
  primaryImage: { type: [String], required: true }, 
  type: { type: String, enum: ['ux', 'illustration'], required: true },
  secondaryImages: [String],
  slug: { type: String, unique: true, required: true }
});

const playgroundSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  context: String, 
  created: String, 
  support: String,
  primaryImage: { type: [String], required: true }, 
  type: { type: String, enum: ['ux', 'illustration'], required: true },
  secondaryImages: [String],
  slug: { type: String, unique: true, required: true }
});

const Project = mongoose.model('Project', projectSchema);
const Playground = mongoose.model('Playground', playgroundSchema);

app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.get('/projects/:slug', async (req, res) => {
  const { slug } = req.params;
  const project = await Project.findOne({ slug });
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.post('/projects', async (req, res) => {
  const { title } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const newProject = new Project({ ...req.body, slug });
  await newProject.save();
  res.json(newProject);
});

app.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject) {
      res.status(200).json({ message: 'Project deleted successfully' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

app.put('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});

// Routes for Playground
app.get('/playgrounds', async (req, res) => {
  const playgrounds = await Playground.find();
  res.json(playgrounds);
});

app.get('/playgrounds/:slug', async (req, res) => {
  const { slug } = req.params;
  const playground = await Playground.findOne({ slug });
  if (playground) {
    res.json(playground);
  } else {
    res.status(404).json({ message: 'Playground not found' });
  }
});

app.post('/playgrounds', async (req, res) => {
  const { title } = req.body;
  const slug = slugify(title, { lower: true, strict: true });
  const newPlayground = new Playground({ ...req.body, slug });
  await newPlayground.save();
  res.json(newPlayground);
});

app.delete('/playgrounds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlayground = await Playground.findByIdAndDelete(id);
    if (deletedPlayground) {
      res.status(200).json({ message: 'Playground deleted successfully' });
    } else {
      res.status(404).json({ message: 'Playground not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playground', error });
  }
});

app.put('/playgrounds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPlayground = await Playground.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPlayground);
  } catch (error) {
    res.status(500).json({ message: 'Error updating playground', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});