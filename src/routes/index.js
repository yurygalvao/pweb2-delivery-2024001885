import { Router } from 'express';

export function criarRotas(entregasController, motoristasController) {
  const router = Router();

  router.get('/', (req, res) => res.redirect('/entregas'));

  // Entregas
  router.get('/entregas', (req, res) => entregasController.listar(req, res));
  router.get('/entregas/nova', (req, res) => entregasController.exibirFormularioCriacao(req, res));
  router.post('/entregas', (req, res) => entregasController.criar(req, res));
  router.get('/entregas/:id', (req, res) => entregasController.obterPorId(req, res));
  router.patch('/entregas/:id/avancar', (req, res) => entregasController.avancarStatus(req, res));
  router.patch('/entregas/:id/cancelar', (req, res) => entregasController.cancelar(req, res));
  router.patch('/entregas/:id/atribuir', (req, res) => entregasController.atribuirMotorista(req, res));

  // Motoristas
  router.get('/motoristas', (req, res) => motoristasController.listar(req, res));
  router.get('/motoristas/novo', (req, res) => motoristasController.exibirFormularioCriacao(req, res));
  router.post('/motoristas', (req, res) => motoristasController.criar(req, res));

  return router;
}