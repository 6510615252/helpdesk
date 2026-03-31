const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, '../helpdesk.db');
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        description TEXT NOT NULL,
        contact     TEXT NOT NULL,
        status      TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'resolved', 'rejected')),
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;