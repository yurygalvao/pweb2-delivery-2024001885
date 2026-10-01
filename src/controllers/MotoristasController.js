export class MotoristasController {
  constructor(motoristasService) {
    this.service = motoristasService;
  }

  criar = (req, res, next) => {
    try {
      const { nome, cpf, placaVeiculo } = req.body;
      const novoMotorista = this.service.criar({ nome, cpf, placaVeiculo });
      return res.status(201).json(novoMotorista);
    } catch (error) {
      next(error);
    }
  };

  listar = (req, res, next) => {
    try {
      const motoristas = this.service.listarTodos();
      return res.status(200).json(motoristas);
    } catch (error) {
      next(error);
    }
  };

  buscarPorId = (req, res, next) => {
    try {
      const { id } = req.params;
      const motorista = this.service.buscarPorId(id);
      return res.status(200).json(motorista);
    } catch (error) {
      next(error);
    }
  };

  listarEntregas = (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      const entregas = this.service.listarEntregas(id, status);
      return res.status(200).json(entregas);
    } catch (error) {
      next(error);
    }
  };
}