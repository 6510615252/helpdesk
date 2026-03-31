const Database = require('better-sqlite3');
const path = require('path');

const db = new Database('/tmp/helpdesk.db');

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