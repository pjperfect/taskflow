// const { readDB } = require('../db');
import { readDB } from '../db.js';

// This notifies a task's assignee that something happened to their task.
async function notifyAssignee(task) {
  const db = await readDB();
  const assignee = db.users.find((u) => u.id === task.assigneeId);
  console.log(`Notifying ${assignee.name} about task "${task.title}"`);
  return true;
}

// module.exports = { notifyAssignee };
export { notifyAssignee };
