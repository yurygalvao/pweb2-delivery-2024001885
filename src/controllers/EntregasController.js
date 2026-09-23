export class EntregasController {
  constructor(entregasService) {
    this.service = entregasService;
  }

  listar = (req, res, next) => {
    try {
      const { status } = req.query;
      const entregas = this.service.listarTodas(status);
      return res.status(200).json(entregas);
    } catch (error) {
      next(error);
    }
  };

  buscarPorId = (req, res, next) => {
    try {
      const { id } = req.params;
      const entrega = this.service.buscarPorId(id);
      return res.status(200).json(entrega);
    } catch (error) {
      next(error);
    }
  };

  criar = (req, res, next) => {
    try {
      const { descricao, origem, destino } = req.body;
      const novaEntrega = this.service.criarEntrega({ descricao, origem, destino });
      return res.status(201).json(novaEntrega);
    } catch (error) {
      next(error);
    }
  };

  avancar = (req, res, next) => {
    try {
      const { id } = req.params;
      const entrega = this.service.avancarStatus(id);
      return res.status(200).json(entrega);
    } catch (error) {
      next(error);
    }
  };

  cancelar = (req, res, next) => {
    try {
      const { id } = req.params;
      const entrega = this.service.cancelarEntrega(id);
      return res.status(200).json(entrega);
    } catch (error) {
      next(error);
    }
  };

  obterHistorico = (req, res, next) => {
    try {
      const { id } = req.params;
      const historico = this.service.obterHistorico(id);
      return res.status(200).json(historico);
    } catch (error) {
      next(error);
    }
  };
}