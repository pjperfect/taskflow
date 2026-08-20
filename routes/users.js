// const express = require('express');
// const router = express.Router();
// const { readDB } = require('../db');
import express from 'express';
const router = express.Router();
import { readDB } from '../db.js';

// GET /users
router.get('/', async (req, res) => {
  const db = await readDB();
  res.json(db.users);
});

// module.exports = router;
export default router;
