import { AppError } from '../utils/AppError.js';

export class MotoristasService {
  constructor(motoristasRepository, entregasRepository) {
    this.motoristasRepository = motoristasRepository;
    this.entregasRepository = entregasRepository;
  }

  criar({ nome, cpf, placaVeiculo }) {
    if (!nome || !cpf) {
      throw new AppError('Os campos nome e cpf são obrigatórios', 400);
    }

    const cpfExistente = this.motoristasRepository.findByCpf(cpf);
    if (cpfExistente) {
      throw new AppError('CPF já cadastrado', 409);
    }

    return this.motoristasRepository.create({
      nome,
      cpf,
      placaVeiculo: placaVeiculo || null,
    });
  }

  listarTodos() {
    return this.motoristasRepository.findAll();
  }

  buscarPorId(id) {
    const motorista = this.motoristasRepository.findById(id);
    if (!motorista) {
      throw new AppError('Motorista não encontrado', 404);
    }
    return motorista;
  }

  listarEntregas(id, status) {
    this.buscarPorId(id);
    return this.entregasRepository.findByMotoristaId(id, status);
  }
}