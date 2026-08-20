// const fs = require('fs');
// const path = require('path');
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedPath = path.join(__dirname, '..', 'data', 'seed.json');
const dbPath = path.join(__dirname, '..', 'data', 'db.json');

fs.copyFileSync(seedPath, dbPath);
console.log('Database reset to seed data.');
