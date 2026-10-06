const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const path = require('node:path');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const requestId = require('./middleware/requestId');
const errorHandler = require('./middleware/errors');

const authRoutes = require('./routes/auth.routes');
const solicitacoesRoutes = require('./routes/solicitacoes.routes');
const healthRoutes = require('./routes/health.routes');
const atrativosRoutes = require('./routes/atractivos.routes');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: false }));
app.use(compression());
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());
app.use(requestId);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

// Frontend: depois vamos ajustar para a pasta real do seu site.
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/api', (req, res) => res.json({ nome: 'Turismo das Araras API', versao: '1.0' }));
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/solicitacoes', solicitacoesRoutes);
app.use('/api/atrativos', atrativosRoutes);

app.use('/api', (req, res) => res.status(404).json({ erro: { codigo: 'ROTA_NAO_ENCONTRADA', mensagem: 'Rota da API não encontrada.', requestId: req.requestId } }));
app.use((req, res) => res.status(404).send('Página não encontrada.'));
app.use(errorHandler);

module.exports = app;
