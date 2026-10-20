import { AppError } from '../utils/AppError.js';

export class MotoristasService {
  constructor(motoristasRepository, entregasRepository) {
    this.motoristasRepository = motoristasRepository;
    this.entregasRepository = entregasRepository;
  }

  async criar({ nome, cpf, placaVeiculo }) {
    if (!nome || !cpf) {
      throw new AppError('Os campos nome e cpf são obrigatórios', 400);
    }

    const cpfExistente = await this.motoristasRepository.findByCpf(cpf);
    if (cpfExistente) {
      throw new AppError('CPF já cadastrado', 409);
    }

    return await this.motoristasRepository.create({
      nome,
      cpf,
      placaVeiculo: placaVeiculo || null,
    });
  }

  async listarTodos() {
    return await this.motoristasRepository.findAll();
  }

  async buscarPorId(id) {
    const motorista = await this.motoristasRepository.findById(id);
    if (!motorista) {
      throw new AppError('Motorista não encontrado', 404);
    }
    return motorista;
  }

  async listarEntregas(id, status) {
    await this.buscarPorId(id);
    return await this.entregasRepository.findByMotoristaId(id, status);
  }
}