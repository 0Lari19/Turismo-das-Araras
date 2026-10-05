const app = require('./app');
const env = require('./config/env');
const { pool } = require('./config/db');

const server = app.listen(env.port, () => {
  console.log(`Servidor Turismo das Araras rodando em http://localhost:${env.port}`);
});

async function shutdown(signal) {
  console.log(`Recebido ${signal}. Encerrando...`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
