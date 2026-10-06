const { query } = require('../config/db');

async function listar(filtros = {}) {
  let queryStr = `SELECT id, slug, nome, descricao, categoria, latitude, longitude, status, versao, criado_em, atualizado_em FROM atrativos WHERE 1=1`;
  const params = [];
  let paramIdx = 1;

  if (filtros.status) {
    queryStr += ` AND status = $${paramIdx}`;
    params.push(filtros.status);
    paramIdx++;
  }

  if (filtros.categoria) {
    queryStr += ` AND categoria = $${paramIdx}`;
    params.push(filtros.categoria);
    paramIdx++;
  }

  queryStr += ` ORDER BY nome ASC`;
  const { rows } = await query(queryStr, params);
  return rows;
}

async function listarPublicados() {
  return listar({ status: 'PUBLICADO' });
}

async function porSlug(slug) {
  const { rows } = await query(
    `SELECT id, slug, nome, descricao, categoria, latitude, longitude, status, versao, criado_em, atualizado_em FROM atrativos WHERE slug = $1`,
    [slug]
  );
  return rows[0];
}

async function criar(atrativo) {
  const { slug, nome, descricao, categoria, latitude, longitude, status } = atrativo;
  const id = require('node:crypto').randomUUID();
  const versao = 1;
  const agora = new Date();
  const criado_em = agora;
  const atualizado_em = agora;

  const { rows } = await query(
    `INSERT INTO atrativos (id, slug, nome, descricao, categoria, latitude, longitude, status, versao, criado_em, atualizado_em) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id, slug, nome, descricao, categoria, latitude, longitude, status, versao, criado_em, atualizado_em`,
    [id, slug, nome, descricao, categoria, latitude, longitude, status, versao, criado_em, atualizado_em]
  );
  return rows[0];
}

async function atualizar(slug, atrativoAtualizado) {
  const { nome, descricao, categoria, latitude, longitude, status } = atrativoAtualizado;
  const atualizadoEm = new Date();

  const { rows } = await query(
    `UPDATE atrativos SET nome = $1, descricao = $2, categoria = $3, latitude = $4, longitude = $5, status = $6, atualizado_em = $7 WHERE slug = $8 RETURNING id, slug, nome, descricao, categoria, latitude, longitude, status, versao, criado_em, atualizado_em`,
    [nome, descricao, categoria, latitude, longitude, status, atualizadoEm, slug]
  );
  return rows[0];
}

module.exports = { listar, listarPublicados, porSlug, criar, atualizar };