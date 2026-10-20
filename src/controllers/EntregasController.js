export class EntregasController {
  constructor(entregasService) {
    this.service = entregasService;
  }

  criar = async (req, res, next) => {
    try {
      const entrega = await this.service.criarEntrega(req.body);
      return res.status(201).json(entrega);
    } catch (error) {
      next(error);
    }
  };

  listar = async (req, res, next) => {
    try {
      const { status } = req.query;
      const entregas = await this.service.listarTodas(status);
      return res.json(entregas);
    } catch (error) {
      next(error);
    }
  };

  buscarPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const entrega = await this.service.buscarPorId(id);
      return res.json(entrega);
    } catch (error) {
      next(error);
    }
  };

  avancar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const entrega = await this.service.avancarStatus(id);
      return res.json(entrega);
    } catch (error) {
      next(error);
    }
  };

  cancelar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const entrega = await this.service.cancelarEntrega(id);
      return res.json(entrega);
    } catch (error) {
      next(error);
    }
  };

  atribuir = async (req, res, next) => {
  try {
    const { id } = req.params;
    const motoristaId = req.body?.motoristaId ?? req.body?.idMotorista ?? req.body?.motorista_id;
    const entrega = await this.service.atribuirMotorista(id, motoristaId);
    return res.json(entrega);
  } catch (error) {
    next(error);
  }
};

  obterHistorico = async (req, res, next) => {
    try {
      const { id } = req.params;
      const historico = await this.service.obterHistorico(id);
      return res.json(historico);
    } catch (error) {
      next(error);
    }
  };
}