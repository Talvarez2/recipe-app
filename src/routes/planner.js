const express = require('express');
const db = require('../db');
const router = express.Router();

// Get meal plan
router.get('/', (req, res) => {
  const rows = db.prepare(`
    SELECT mp.id, mp.day, mp.meal, mp.recipe_id, r.title, r.image_path, r.category
    FROM meal_plan mp JOIN recipes r ON mp.recipe_id = r.id
    ORDER BY mp.id
  `).all();
  res.json(rows);
});

// Add recipe to meal plan
router.post('/', (req, res) => {
  const { recipe_id, day, meal } = req.body;
  const result = db.prepare('INSERT INTO meal_plan (recipe_id, day, meal) VALUES (?, ?, ?)').run(recipe_id, day, meal);
  res.status(201).json({ id: result.lastInsertRowid });
});

// Remove from meal plan
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM meal_plan WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Clear entire plan
router.delete('/', (req, res) => {
  db.prepare('DELETE FROM meal_plan').run();
  res.json({ success: true });
});

module.exports = router;
