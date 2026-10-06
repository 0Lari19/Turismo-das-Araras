CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY,
  nome VARCHAR(120) NOT NULL CHECK (char_length(trim(nome)) BETWEEN 2 AND 120),
  email VARCHAR(254) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  papel VARCHAR(30) NOT NULL DEFAULT 'USUARIO' CHECK (papel IN ('USUARIO','ADMINISTRADOR','GESTOR')),
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS atrativos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(160) NOT NULL UNIQUE,
  nome VARCHAR(160) NOT NULL,
  descricao TEXT NOT NULL,
  categoria VARCHAR(60) NOT NULL,
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  status VARCHAR(20) NOT NULL DEFAULT 'RASCUNHO' CHECK (status IN ('RASCUNHO','PUBLICADO','ARQUIVADO')),
  versao INTEGER NOT NULL DEFAULT 1 CHECK (versao >= 1),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_atrativos_publicados ON atrativos(status, nome);
CREATE INDEX IF NOT EXISTS idx_atrativos_categoria ON atrativos(categoria);

CREATE TABLE IF NOT EXISTS solicitacoes (
  id UUID PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  telefone VARCHAR(20),
  mensagem TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'RECEBIDO' CHECK (status IN ('RECEBIDO','EM_ATENDIMENTO','ENCERRADO')),
  motivo TEXT,
  versao INTEGER NOT NULL DEFAULT 1 CHECK (versao >= 1),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_status_data ON solicitacoes(status, criado_em DESC);

CREATE TABLE IF NOT EXISTS auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  operacao VARCHAR(50) NOT NULL,
  entidade VARCHAR(80) NOT NULL,
  entidade_id UUID,
  resultado VARCHAR(20) NOT NULL,
  dados JSONB NOT NULL DEFAULT '{}'::jsonb,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_auditoria_data ON auditoria(criado_em DESC);
CREATE INDEX IF NOT EXISTS idx_auditoria_entidade ON auditoria(entidade, entidade_id);
