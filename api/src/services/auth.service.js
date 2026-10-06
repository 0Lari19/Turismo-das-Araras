const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { randomUUID } = require('node:crypto');
const { query } = require('../config/db');
const env = require('../config/env');

async function register({ nome, email, senha }) {
  const exists = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
  if (exists.rowCount) {
    const err = new Error('E-mail já cadastrado.'); err.status = 409; err.expose = true; err.code = 'EMAIL_EXISTENTE'; throw err;
  }
  const senhaHash = await bcrypt.hash(senha, 12);
  const id = randomUUID();
  const result = await query(
    `INSERT INTO usuarios (id, nome, email, senha_hash, papel, ativo) VALUES ($1,$2,$3,$4,'USUARIO',true) RETURNING id,nome,email,papel,ativo,criado_em`,
    [id, nome, email, senhaHash]
  );
  return result.rows[0];
}

async function login({ email, senha }) {
  const result = await query('SELECT id,nome,email,senha_hash,papel,ativo FROM usuarios WHERE email = $1', [email]);
  const user = result.rows[0];
  const valid = user && user.ativo ? await bcrypt.compare(senha, user.senha_hash) : false;
  if (!valid) {
    const err = new Error('Credenciais inválidas.'); err.status = 401; err.expose = true; err.code = 'CREDENCIAIS_INVALIDAS'; throw err;
  }
  const token = jwt.sign(
    { sub: user.id, papel: user.papel },
    env.jwtSecret,
    { algorithm: 'HS256', expiresIn: '30m', issuer: env.jwtIssuer, audience: env.jwtAudience }
  );
  return { token, usuario: { id: user.id, nome: user.nome, email: user.email, papel: user.papel, ativo: user.ativo } };
}

module.exports = { register, login };
