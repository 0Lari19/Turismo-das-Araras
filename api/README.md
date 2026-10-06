# Backend - Turismo das Araras

Backend inicial em Node.js + Express + PostgreSQL para o projeto Turismo das Araras.

## Requisitos
- Node.js 20+
- PostgreSQL
- VS Code

## Instalação
1. Abra esta pasta no VS Code.
2. Copie `.env.example` para `.env`.
3. Edite o `.env` com a conexão do PostgreSQL e uma `JWT_SECRET` longa.
4. No terminal execute `npm install`.
5. Crie o banco `turismo_araras` no PostgreSQL.
6. Execute `db/migrations/001_initial.sql` no banco.
7. Execute `npm run dev`.
8. Teste `http://localhost:3000/api/health`.

O frontend atual será integrado na próxima etapa. Não coloque `.env` no GitHub.
