const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// List all recipes
router.get('/', (req, res) => {
  const recipes = db.prepare('SELECT * FROM recipes ORDER BY created_at DESC').all();
  res.json(recipes);
});

// Get single recipe
router.get('/:id', (req, res) => {
  const recipe = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Not found' });
  res.json(recipe);
});

// Create recipe
router.post('/', upload.single('image'), (req, res) => {
  const { title, description, ingredients, instructions, category, prep_time, cook_time, servings } = req.body;
  const image_path = req.file ? `/uploads/${req.file.filename}` : null;
  const result = db.prepare(
    'INSERT INTO recipes (title, description, ingredients, instructions, category, prep_time, cook_time, servings, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(title, description, ingredients, instructions, category || 'dinner', prep_time, cook_time, servings, image_path);
  res.status(201).json({ id: result.lastInsertRowid });
});

// Update recipe
router.put('/:id', upload.single('image'), (req, res) => {
  const { title, description, ingredients, instructions, category, prep_time, cook_time, servings } = req.body;
  const existing = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  const image_path = req.file ? `/uploads/${req.file.filename}` : existing.image_path;
  db.prepare(
    'UPDATE recipes SET title=?, description=?, ingredients=?, instructions=?, category=?, prep_time=?, cook_time=?, servings=?, image_path=? WHERE id=?'
  ).run(title, description, ingredients, instructions, category, prep_time, cook_time, servings, image_path, req.params.id);
  res.json({ success: true });
});

// Delete recipe
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM recipes WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

module.exports = router;
