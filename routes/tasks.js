// const express = require('express');
// const router = express.Router();
// const { readDB, writeDB, delay } = require('../db');
// const { notifyAssignee } = require('../utils/notify');
import express from 'express';
const router = express.Router();
import { readDB, writeDB, delay, withDBLock } from '../db.js';
import { notifyAssignee } from '../utils/notify.js';

// GET /tasks?page=1&pageSize=5
router.get('/', async (req, res) => {
  const db = await readDB();
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 5;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const tasks = db.tasks.slice(start, end);

  res.json({ page, pageSize, total: db.tasks.length, tasks });
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  const db = await readDB();
  const task = db.tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks
router.post('/', async (req, res) => {
  const db = await readDB();
  const { title, assigneeId, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  const newTask = {
    id: db.tasks.length ? Math.max(...db.tasks.map((t) => t.id)) + 1 : 1,
    title,
    assigneeId: assigneeId ?? null,
    completed: false,
    dueDate: dueDate ?? null,
  };

  db.tasks.push(newTask);
  await writeDB(db);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id/complete
router.patch('/:id/complete', async (req, res) => {
  const id = Number(req.params.id);
  const task = await withDBLock(async () => {
    const db = await readDB();

    const t = db.tasks.find((t) => t.id === id);
    if (!t) return null;

    await delay(150);

    t.completed = true;
    await writeDB(db);

    return t;
  });

  if (!task) return res.status(404).json({ error: 'Task not found' });
  await notifyAssignee(task);
  res.json(task);
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  const db = await readDB();
  const id = Number(req.params.id);
  db.tasks = db.tasks.filter((t) => t.id !== id);
  await writeDB(db);
  res.status(204).end();
});

router.post('/bulk-delete', async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'ids must be a non-empty array' });
  }

  const db = await readDB();
  const numericIds = ids.map(Number);
  db.tasks = db.tasks.filter((t) => !numericIds.includes(t.id));
  await writeDB(db);

  res.status(200).json({ message: 'Tasks deleted successfully' });
});

// module.exports = router;
export default router;
