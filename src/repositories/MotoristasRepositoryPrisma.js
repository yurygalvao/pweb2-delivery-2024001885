import { prisma } from '../database/prisma.js';

export class MotoristasRepositoryPrisma {
  async findAll() {
    return await prisma.motorista.findMany();
  }

  async findById(id) {
    if (id === undefined || id === null) return null;
    const numericId = Number(id);
    if (isNaN(numericId)) return null;

    return await prisma.motorista.findUnique({
      where: { id: numericId },
    });
  }

  async findByCpf(cpf) {
    if (!cpf) return null;
    return await prisma.motorista.findUnique({
      where: { cpf: String(cpf) },
    });
  }

  async create(motoristaData) {
    return await prisma.motorista.create({
      data: {
        nome: motoristaData.nome,
        cpf: String(motoristaData.cpf),
        placaVeiculo: motoristaData.placaVeiculo || null,
        status: motoristaData.status || 'ATIVO',
      },
    });
  }
}