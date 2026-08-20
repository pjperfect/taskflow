// const fs = require('fs').promises;
// const path = require('path');
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'data', 'db.json');

async function readDB() {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// This simulates real-world DB/network latency so timing-dependent bugs behave the way they would against a real database.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// module.exports = { readDB, writeDB, delay };
export { readDB, writeDB, delay };
