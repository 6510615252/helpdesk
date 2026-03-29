const db = require('../db');

const create = ({ title, description, contact }) => {
    const result = db.prepare(`
        INSERT INTO tickets (title, description, contact)
        VALUES (?, ?, ?)
    `).run(title, description, contact);
    return findById(result.lastInsertRowid);
};

const update = (id, fields) => {
    const allowed = ['title', 'description', 'contact', 'status'];
    const keys = Object.keys(fields).filter(k => allowed.includes(k));
    
    if (keys.length === 0) return findById(id);
    
    const setClauses = [...keys.map(k => `${k} = ?`), 'updated_at = CURRENT_TIMESTAMP'];
    const values = [...keys.map(k => fields[k]), id];
    
    db.prepare(`UPDATE tickets SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
    return findById(id);
};

const findAll = ({ status, sortBy = 'updated_at' } = {}) => {
    const validSort = ['status', 'updated_at', 'created_at'].includes(sortBy) ? sortBy : 'updated_at';
    
    if (status) {
        return db.prepare(`
            SELECT * FROM tickets WHERE status = ? ORDER BY ${validSort} DESC
        `).all(status);
    }
    return db.prepare(`
        SELECT * FROM tickets ORDER BY ${validSort} DESC
    `).all();
};

const findById = (id) => {
    return db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
};





module.exports = { findAll, findById, create, update };