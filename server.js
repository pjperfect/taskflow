// const express = require('express');
// const path = require('path');
// const fs = require('fs');
import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import fs from 'fs';

// const tasksRouter = require('./routes/tasks');
// const usersRouter = require('./routes/users');
import tasksRouter from './routes/tasks.js';
import usersRouter from './routes/users.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'data', 'db.json');
const seedPath = path.join(__dirname, 'data', 'seed.json');

if (!fs.existsSync(dbPath)) {
  fs.copyFileSync(seedPath, dbPath);
}

app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ status: 'TaskFlow API running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TaskFlow API listening on port ${PORT}`);
});
