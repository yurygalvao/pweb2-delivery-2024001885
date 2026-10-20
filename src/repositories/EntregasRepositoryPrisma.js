import { prisma } from '../database/prisma.js';

export class EntregasRepositoryPrisma {
  _mapEntrega(entrega) {

  if (!entrega) return null;

  return {
    id: entrega.id,
    descricao: entrega.descricao,
    origem: entrega.origem,
    destino: entrega.destino,
    status: entrega.status,
    motoristaId: entrega.motoristaId,
    historico: Array.isArray(entrega.historico)
      ? entrega.historico.map(h => ({
          data: typeof h.data === 'object' && h.data?.toISOString ? h.data.toISOString() : String(h.data),
          descricao: h.descricao,
        }))
      : [],
  };
}

  async findAll(statusFilter) {
    const where = statusFilter ? { status: statusFilter } : {};
    const entregas = await prisma.entrega.findMany({
      where,
      include: { historico: true },
    });
    return entregas.map(e => this._mapEntrega(e));
  }

  async findById(id) {
    if (id === undefined || id === null) return null;
    const numericId = Number(id);
    if (isNaN(numericId)) return null;

    const entrega = await prisma.entrega.findUnique({
      where: { id: numericId },
      include: { historico: true },
    });
    return this._mapEntrega(entrega);
  }

  async findByMotoristaId(motoristaId, statusFilter) {
    if (motoristaId === undefined || motoristaId === null) return [];
    const numericMotoristaId = Number(motoristaId);
    if (isNaN(numericMotoristaId)) return [];

    const where = {
      motoristaId: numericMotoristaId,
      ...(statusFilter ? { status: statusFilter } : {}),
    };
    const entregas = await prisma.entrega.findMany({
      where,
      include: { historico: true },
    });
    return entregas.map(e => this._mapEntrega(e));
  }

  async findActiveDuplicate(descricao, origem, destino) {
    const entrega = await prisma.entrega.findFirst({
      where: {
        descricao,
        origem,
        destino,
        status: {
          notIn: ['ENTREGUE', 'CANCELADA'],
        },
      },
      include: { historico: true },
    });
    return this._mapEntrega(entrega);
  }

  async create(entregaData) {
    const novaEntrega = await prisma.entrega.create({
      data: {
        descricao: entregaData.descricao,
        origem: entregaData.origem,
        destino: entregaData.destino,
        status: entregaData.status || 'CRIADA',
        motoristaId: null,
        historico: {
          create: (entregaData.historico || []).map(h => ({
            data: String(h.data),
            descricao: h.descricao,
          })),
        },
      },
      include: { historico: true },
    });
    return this._mapEntrega(novaEntrega);
  }

  async update(entregaAtualizada) {
    const numericId = Number(entregaAtualizada.id);
    const historicoAtual = await prisma.historicoEntrega.findMany({
      where: { entregaId: numericId },
    });

    const novosEventos = (entregaAtualizada.historico || []).filter(hNovo => {
      const hNovoDataStr = String(hNovo.data);
      return !historicoAtual.some(hAntigo => {
        const hAntigoDataStr = typeof hAntigo.data === 'object' && hAntigo.data?.toISOString ? hAntigo.data.toISOString() : String(hAntigo.data);
        return hAntigoDataStr === hNovoDataStr && hAntigo.descricao === hNovo.descricao;
      });
    });

    const entrega = await prisma.entrega.update({
      where: { id: numericId },
      data: {
        status: entregaAtualizada.status,
        motoristaId: entregaAtualizada.motoristaId ? Number(entregaAtualizada.motoristaId) : null,
        historico: {
          create: novosEventos.map(h => ({
            data: String(h.data),
            descricao: h.descricao,
          })),
        },
      },
      include: { historico: true },
    });

    return this._mapEntrega(entrega);
  }
}