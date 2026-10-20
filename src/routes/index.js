import { Router } from 'express';
import { EntregasRepositoryPrisma } from '../repositories/EntregasRepositoryPrisma.js';
import { MotoristasRepositoryPrisma } from '../repositories/MotoristasRepositoryPrisma.js';
import { EntregasService } from '../services/EntregasService.js';
import { MotoristasService } from '../services/MotoristasService.js';
import { EntregasController } from '../controllers/EntregasController.js';
import { MotoristasController } from '../controllers/MotoristasController.js';

export function criarRotas() {
  const router = Router();

  // Composition Root (Injeção de Dependências com Prisma)
  const entregasRepo = new EntregasRepositoryPrisma();
  const motoristasRepo = new MotoristasRepositoryPrisma();

  const entregasService = new EntregasService(entregasRepo, motoristasRepo);
  const motoristasService = new MotoristasService(motoristasRepo, entregasRepo);

  const entregasController = new EntregasController(entregasService);
  const motoristasController = new MotoristasController(motoristasService);

  // Rotas de Entregas
  router.post('/entregas', entregasController.criar);
  router.get('/entregas', entregasController.listar);
  router.get('/entregas/:id', entregasController.buscarPorId);
  router.patch('/entregas/:id/avancar', entregasController.avancar);
  router.patch('/entregas/:id/cancelar', entregasController.cancelar);
  router.patch('/entregas/:id/atribuir', entregasController.atribuir);
  router.get('/entregas/:id/historico', entregasController.obterHistorico);

  // Rotas de Motoristas
  router.post('/motoristas', motoristasController.criar);
  router.get('/motoristas', motoristasController.listar);
  router.get('/motoristas/:id', motoristasController.buscarPorId);
  router.get('/motoristas/:id/entregas', motoristasController.listarEntregas);

  return router;
}