/**
 * @typedef {Object} Motorista
 * @property {number} id
 * @property {string} nome
 * @property {string} cpf
 * @property {string|null} placaVeiculo
 * @property {string} status - ATIVO | INATIVO
 */

/**
 * Contrato IMotoristasRepository
 * @interface IMotoristasRepository
 */
export class MotoristasRepository {
  constructor(database) {
    this.db = database;
  }

  /**
   * @returns {Motorista[]}
   */
  findAll() {
    return this.db.motoristas;
  }

  /**
   * @param {number} id
   * @returns {Motorista|null}
   */
  findById(id) {
    return this.db.motoristas.find(m => m.id === Number(id)) || null;
  }

  /**
   * @param {string} cpf
   * @returns {Motorista|null}
   */
  findByCpf(cpf) {
    return this.db.motoristas.find(m => m.cpf === cpf) || null;
  }

  /**
   * @param {Object} motoristaData
   * @returns {Motorista}
   */
  create(motoristaData) {
    const novoMotorista = {
      id: this.db.nextMotoristaId++,
      ...motoristaData,
      status: 'ATIVO',
    };
    this.db.motoristas.push(novoMotorista);
    return novoMotorista;
  }
}