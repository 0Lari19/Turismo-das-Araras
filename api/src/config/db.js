const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.databaseUrl,
  max: 10,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  statement_timeout: 10000
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool PostgreSQL:', err.message);
});

async function query(text, params) {
  return pool.query(text, params);
}

async function testConnection() {
  await pool.query('SELECT 1');
}

module.exports = { pool, query, testConnection };
