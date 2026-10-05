const { randomUUID } = require('node:crypto');
const { query } = require('../config/db');

async function criar({ nome, email, telefone, mensagem }) {
  const id = randomUUID();
  const result = await query(
    `INSERT INTO solicitacoes (id,nome,email,telefone,mensagem,status,versao) VALUES ($1,$2,$3,$4,$5,'RECEBIDO',1) RETURNING id,status,criado_em`,
    [id, nome, email, telefone || null, mensagem]
  );
  return result.rows[0];
}

module.exports = { criar };
