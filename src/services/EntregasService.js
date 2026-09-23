import { AppError } from '../utils/AppError.js';

export class EntregasService {
  constructor(entregasRepository) {
    this.repository = entregasRepository;
  }

  listarTodas(status) {
    return this.repository.findAll(status);
  }

  buscarPorId(id) {
    const entrega = this.repository.findById(id);
    if (!entrega) {
      throw new AppError('Entrega não encontrada', 404);
    }
    return entrega;
  }

  criarEntrega({ descricao, origem, destino }) {
    if (!descricao || !origem || !destino) {
      throw new AppError('Os campos descricao, origem e destino são obrigatórios', 400);
    }

    if (origem === destino) {
      throw new AppError('A origem e o destino não podem ser iguais', 400);
    }

    const duplicada = this.repository.findActiveDuplicate(descricao, origem, destino);
    if (duplicada) {
      throw new AppError('Já existe uma entrega ativa com a mesma descrição, origem e destino', 409);
    }

    const agora = new Date().toISOString();
    const novaEntrega = {
      descricao,
      origem,
      destino,
      status: 'CRIADA',
      historico: [
        { data: agora, descricao: 'Entrega criada' }
      ]
    };

    return this.repository.create(novaEntrega);
  }

  avancarStatus(id) {
    const entrega = this.buscarPorId(id);

    let novoStatus = null;
    if (entrega.status === 'CRIADA') {
      novoStatus = 'EM_TRANSITO';
    } else if (entrega.status === 'EM_TRANSITO') {
      novoStatus = 'ENTREGUE';
    } else {
      throw new AppError(`Não é possível avançar a partir do status ${entrega.status}`, 422);
    }

    const agora = new Date().toISOString();
    entrega.status = novoStatus;
    entrega.historico.push({
      data: agora,
      descricao: `Status alterado para ${novoStatus}`
    });

    return this.repository.update(entrega);
  }

  cancelarEntrega(id) {
    const entrega = this.buscarPorId(id);

    if (entrega.status === 'ENTREGUE' || entrega.status === 'CANCELADA') {
      throw new AppError(`Não é possível cancelar uma entrega com status ${entrega.status}`, 422);
    }

    const agora = new Date().toISOString();
    entrega.status = 'CANCELADA';
    entrega.historico.push({
      data: agora,
      descricao: 'Entrega cancelada'
    });

    return this.repository.update(entrega);
  }

  obterHistorico(id) {
    const entrega = this.buscarPorId(id);
    return entrega.historico;
  }
}