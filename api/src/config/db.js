const Database = require('better-sqlite3');
const env = require('./env');

const db = new Database(env.databaseUrl, { readonly: false });

db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

const pool = {
  query: (text, params) => {
    const stmt = db.prepare(text);
    return { rows: stmt.all(params) };
  },
  execute: (text, params) => {
    const stmt = db.prepare(text);
    stmt.run(params);
    return { rows: [] };
  },
  close: () => {
    db.close();
  }
};

function testConnection() {
  return pool.query('SELECT 1');
}

module.exports = { pool, query: pool.query, testConnection };
