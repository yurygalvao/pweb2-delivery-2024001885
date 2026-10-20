export class MotoristasController {
  constructor(motoristasService) {
    this.service = motoristasService;
  }

  criar = async (req, res, next) => {
    try {
      const motorista = await this.service.criar(req.body);
      return res.status(201).json(motorista);
    } catch (error) {
      next(error);
    }
  };

  listar = async (req, res, next) => {
    try {
      const motoristas = await this.service.listarTodos();
      return res.json(motoristas);
    } catch (error) {
      next(error);
    }
  };

  buscarPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const motorista = await this.service.buscarPorId(id);
      return res.json(motorista);
    } catch (error) {
      next(error);
    }
  };

  listarEntregas = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      const entregas = await this.service.listarEntregas(id, status);
      return res.json(entregas);
    } catch (error) {
      next(error);
    }
  };
}