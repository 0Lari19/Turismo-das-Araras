module.exports = function errorHandler(err, req, res, next) {
  console.error(`[${req.requestId || 'sem-request-id'}]`, err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    erro: {
      codigo: err.code || 'ERRO_INTERNO',
      mensagem: err.expose ? err.message : 'Ocorreu um erro interno.',
      requestId: req.requestId
    }
  });
};
