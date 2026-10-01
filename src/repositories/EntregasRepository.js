/**
 * @typedef {Object} Entrega
 * @property {number} id
 * @property {string} descricao
 * @property {string} origem
 * @property {string} destino
 * @property {string} status - CRIADA | EM_TRANSITO | ENTREGUE | CANCELADA
 * @property {number|null} motoristaId
 * @property {Array<{data: string, descricao: string}>} historico
 */

/**
 * Contrato IEntregasRepository
 * @interface IEntregasRepository
 */
export class EntregasRepository {
  constructor(database) {
    this.db = database;
  }

  /**
   * @param {string} [statusFilter]
   * @returns {Entrega[]}
   */
  findAll(statusFilter) {
    if (statusFilter) {
      return this.db.entregas.filter(e => e.status === statusFilter);
    }
    return this.db.entregas;
  }

  /**
   * @param {number} id
   * @returns {Entrega|null}
   */
  findById(id) {
    return this.db.entregas.find(e => e.id === Number(id)) || null;
  }

  /**
   * @param {number} motoristaId
   * @param {string} [statusFilter]
   * @returns {Entrega[]}
   */
  findByMotoristaId(motoristaId, statusFilter) {
    return this.db.entregas.filter(e => {
      const eMotorista = e.motoristaId === Number(motoristaId);
      if (statusFilter) {
        return eMotorista && e.status === statusFilter;
      }
      return eMotorista;
    });
  }

  /**
   * @param {string} descricao
   * @param {string} origem
   * @param {string} destino
   * @returns {Entrega|null}
   */
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

  /**
   * @param {Object} entregaData
   * @returns {Entrega}
   */
  create(entregaData) {
    const novaEntrega = {
      id: this.db.nextId++,
      ...entregaData,
      motoristaId: null,
    };
    this.db.entregas.push(novaEntrega);
    return novaEntrega;
  }

  /**
   * @param {Entrega} entregaAtualizada
   * @returns {Entrega|null}
   */
  update(entregaAtualizada) {
    const index = this.db.entregas.findIndex(e => e.id === entregaAtualizada.id);
    if (index !== -1) {
      this.db.entregas[index] = entregaAtualizada;
      return this.db.entregas[index];
    }
    return null;
  }
}