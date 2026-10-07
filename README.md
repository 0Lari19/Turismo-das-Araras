# Turismo das Araras

## Descrição do Projeto

O "Turismo das Araras" é uma plataforma web desenvolvida para divulgar e valorizar os principais pontos turísticos de Barra do Garças, no estado de Mato Grosso. O projeto tem como objetivo apresentar aos visitantes as belezas naturais, culturais e históricas da região, incluindo cachoeiras, serras, rios, trilhas ecológicas, águas termais e outros atrativos turísticos.

## Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript
- React 18
- React Router DOM
- Vite (build tool)

### Backend
- Node.js
- Express
- SQLite3

## Estrutura do Projeto

```
Turismo-das-Araras/
├── api/              # Backend API
│   ├── src/          # Código fonte da API
│   ├── .env.example  # Variáveis de ambiente exemplo
│   ├── .gitignore    # Arquivo de ignore do Git
│   └── db/           # Banco de dados SQLite
├── frontend/         # Frontend (Interface Web)
│   ├── src/          # Componentes e páginas React
│   │   ├── pages/    # Páginas HTML standalone
│   │   ├── components/ # Componentes React reutilizáveis
│   │   ├── context/   # Contexto de autenticação
│   │   └── services/  # Serviços de API
│   ├── public/       # Arquivos públicos (servidos diretamente)
│   │   ├── index.html  # Página inicial HTML
│   │   └── assets/img/ # Imagens de apoio
│   ├── .env.example  # Variáveis de ambiente frontend
│   ├── .gitignore    # Arquivo de ignore do Git
│   ├── package.json  # Dependências do frontend
│   └── vite.config.js # Configuração do Vite
├── doc/              # Documentação do projeto
│   ├── escopo_do_projeto.md
│   ├── prompt_documentacao.md
│   ├── requisitos_de_sistema.md
│   └── requisitos_de_usuario.md
└── .gitignore        # Ignorar arquivos confidenciaos e de build
```

## Páginas HTML

O projeto contém 28 páginas HTML standalone que descrevem diversos pontos turísticos:

### Páginas Principais
- `inicio.html` - Página inicial com destinos destacadeos
- `sobre.html` - Informações sobre o site e projeto
- `login.html` - Página de login de usuário
- `cadrastro.html` - Página de cadastro de usuário

### Atrações Naturais
- `aguasquentes.html` - Parque das Águas Quentes
- `serraazul.html` - Parque Estadual da Serra Azul
- `portodobae.html` - Porto do Baé
- `cristoredentor.html` - Estátua do Cristo Redentor
- `serradoroncador.html` - Serra do Roncador
- `rioaraguaia.html` - Rio Araguaia
- `riogacas.html` - Rio Garças
- `praiadobosque.html` - Praia do Bosque
- `caniondosipo.html` - Canyon do Cipó
- `trilhadabarra.html` - Trilhas da Barra
- `mirantedoamor.html` - Mirante do Amor
- `discoporto.html` - Discoporto
- `pezinhos.html` - Gruta dos Pezinhos
- `santuarioararas.html` - Santuário das Araras
- `favodemal.html` - Estância Favo de Mel

### Cachoeiras e Áreas
- `cachoeiraazul.html` - Cachoeira Azul
- `cachoeiradobateia.html` - Cachoeira do Bateia
- `cachoeiradausina.html` - Cachoeira da Usina
- `cachoeiradaserra.html` - Cachoeira Pé da Serra
- `cachoeiraazul.html` - Cachoeira Azul
- `complexodobateia.html` - Complexo do Bateia

### Outras Páginas
- `azuldasaguas.html` - Águas Azuis
- `cachoeiracristal.html` - Cachoeira Cristal
- `solnascente.html` - Cachoeira Sol Nascente

## Como Executar

### Frontend (React/Vite)

1. Instale as dependências:
   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse em: `http://localhost:5173`

### Backend (Node.js/Express)

1. Instale as dependências:
   ```bash
   cd api
   npm install
   ```

2. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   # ou: node server.js
   ```

4. A API estará disponível em: `http://localhost:3000` (configurável no .env)

## Banco de Dados

O backend utiliza SQLite como banco de dados. O arquivo do banco de dados fica dentro da pasta `api/db/` e é acessado pelo backend através das rotas definidas. O SQLite foi escolhido por ser um banco de dados em arquivo único, facilitando o deploy e a portabilidade da aplicação.

**Importante:** O arquivo `.env` e o banco de dados `*.db` já estão configurados no `.gitignore` para não serem enviados ao repositório Git.

## Rotas da API

### Atrações
- `GET /atractivos` - Listar todas as atrações
- `POST /atractivos` - Criar nova atração
- `GET /atractivos/:id` - Buscar atração por ID

### Autenticação
- `POST /auth/login` - Login de usuário
- `POST /auth/register` - Registro de usuário

### Health Check
- `GET /health` - Verificar status da API

## Notas Importantes

1. **Arquivos confidenciais**: O `.env`, arquivos de log (`*.log`) e o banco de dados (`*.db`) estão no `.gitignore` e não serão commitados.

2. **Imagens**: Todas as imagens estão localizadas em `frontend/public/assets/img/` e são referenciadas nos HTMLs com o prefixo `assets/img/`. As imagens foram otimizadas para web e devem ser adicionadas ao `.gitignore` caso sejam geradas dinamicamente.

3. **Navegação entre páginas**: Todas as páginas HTML estão interligadas através de links `href` relativos. A navegação principal ocorre através do menu de seleção no header e dos links "Voltar" e "Inicio" presentes em cada página.

4. **Responsividade**: O design foi desenvolvido para funcionar em desktops. Para dispositivos móveis, recomenda-se testes adicionais de CSS.