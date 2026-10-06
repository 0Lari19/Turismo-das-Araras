const service = require('../services/atractivos.service');

module.exports = {
  listar: async (req, res, next) => {
    try {
      const filtros = {};
      if (req.query.status) filtros.status = req.query.status;
      if (req.query.categoria) filtros.categoria = req.query.categoria;
      const result = await service.listar(filtros);
      res.json(result);
    } catch (e) { next(e); }
  },

  listarPublicados: async (req, res, next) => {
    try {
      const result = await service.listarPublicados();
      res.json(result);
    } catch (e) { next(e); }
  },

  porSlug: async (req, res, next) => {
    try {
      const result = await service.porSlug(req.params.slug);
      if (!result) return res.status(404).json({ erro: { codigo: 'ATRATIVO_NAO_ENCONTRADO', mensagem: 'Atrativo não encontrado.' } });
      res.json(result);
    } catch (e) { next(e); }
  }
};