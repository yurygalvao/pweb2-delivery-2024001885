export class EntregasRepository {
  constructor(database) {
    this.db = database;
  }

  findAll(statusFilter) {
    if (statusFilter) {
      return this.db.entregas.filter(e => e.status === statusFilter);
    }
    return this.db.entregas;
  }

  findById(id) {
    return this.db.entregas.find(e => e.id === Number(id)) || null;
  }

  findActiveDuplicate(descricao, origem, destino) {
    return this.db.entregas.find(
      e =>
        e.descricao === descricao &&
        e.origem === origem &&
        e.destino === destino &&
        e.status !== 'ENTREGUE' &&
        e.status !== 'CANCELADA'
    ) || null;
  }

  create(entregaData) {
    const novaEntrega = {
      id: this.db.nextId++,
      ...entregaData,
      motoristaId: null,
    };
    this.db.entregas.push(novaEntrega);
    return novaEntrega;
  }

  update(entregaAtualizada) {
    const index = this.db.entregas.findIndex(e => e.id === entregaAtualizada.id);
    if (index !== -1) {
      this.db.entregas[index] = entregaAtualizada;
      return this.db.entregas[index];
    }
    return null;
  }
}