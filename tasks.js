const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { title, description = null, due_date = null } = req.body || {};

  if (typeof title !== 'string' || !title.trim() || title.trim().length > 200) {
    return res.status(400).json({ error: 'Title is required and must be 1–200 characters' });
  }
  if (description !== null && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be text or null' });
  }
  if (due_date !== null &&
      (typeof due_date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(due_date) ||
       Number.isNaN(Date.parse(`${due_date}T00:00:00Z`)))) {
    return res.status(400).json({ error: 'due_date must use YYYY-MM-DD format' });
  }

  try {
    const result = await db.query(
      `INSERT INTO tasks (user_id, title, description, due_date)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, title, description, status, due_date, created_at`,
      [req.user.id, title.trim(), description, due_date]
    );
    return res.status(201).json({ task: result.rows[0] });
  } catch (_error) {
    return res.status(500).json({ error: 'Unable to create task' });
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Task ID must be a positive integer' });
  }

  try {
    const result = await db.query(
      `SELECT id, user_id, title, description, status, due_date, created_at
       FROM tasks WHERE id = $1 AND user_id = $2`,
      [id, req.user.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Task not found' });
    return res.json({ task: result.rows[0] });
  } catch (_error) {
    return res.status(500).json({ error: 'Unable to read task' });
  }
});

module.exports = router;
