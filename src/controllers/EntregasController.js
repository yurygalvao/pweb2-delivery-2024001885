export class EntregasController {
  constructor(entregasService, motoristasService) {
    this.entregasService = entregasService;
    this.motoristasService = motoristasService;
  }

  // GET /entregas
  async listar(req, res) {
    try {
      const { status } = req.query;
      const entregas = await this.entregasService.listarTodas(status);
      res.render('entregas/index', { entregas, status });
    } catch (error) {
      console.error('Erro em EntregasController.listar:', error);
      res.status(500).render('entregas/index', { 
        entregas: [], 
        status: req.query.status,
        error_msg: 'Erro ao carregar a lista de entregas.' 
      });
    }
  }

  // GET /entregas/nova
  exibirFormularioCriacao(req, res) {
    res.render('entregas/nova', { dados: {} });
  }

  // POST /entregas
  async criar(req, res) {
    const { descricao, origem, destino } = req.body;
    try {
      const novaEntrega = await this.entregasService.criarEntrega({ descricao, origem, destino });
      req.flash('success', `Entrega #${novaEntrega.id} criada com sucesso!`);
      res.redirect('/entregas');
    } catch (error) {
      console.error('Erro ao criar entrega:', error);
      res.status(400).render('entregas/nova', {
        errors: [{ msg: error.message }],
        dados: { descricao, origem, destino }
      });
    }
  }

  // GET /entregas/:id
  async obterPorId(req, res) {
    try {
      const id = Number(req.params.id);
      console.log(`[DEBUG] A carregar detalhes da entrega #${id}`);

      const entrega = await this.entregasService.buscarPorId(id);

      if (!entrega) {
        req.flash('error', 'Entrega não encontrada.');
        return res.redirect('/entregas');
      }

      let motoristas = [];
      try {
        motoristas = await this.motoristasService.listarTodos();
      } catch (err) {
        console.error('Erro ao buscar lista de motoristas:', err.message);
      }

      res.render('entregas/detalhe', { entrega, motoristas });
    } catch (error) {
      console.error('Erro ao renderizar detalhes da entrega:', error);
      req.flash('error', error.message || 'Erro ao carregar detalhes da entrega.');
      res.redirect('/entregas');
    }
  }

  // PATCH /entregas/:id/avancar
  async avancarStatus(req, res) {
    const { id } = req.params;
    try {
      await this.entregasService.avancarStatus(Number(id));
      req.flash('success', 'Status da entrega avançado com sucesso!');
    } catch (error) {
      req.flash('error', error.message);
    }
    res.redirect(`/entregas/${id}`);
  }

  // PATCH /entregas/:id/cancelar
  async cancelar(req, res) {
    const { id } = req.params;
    try {
      await this.entregasService.cancelarEntrega(Number(id));
      req.flash('success', 'Entrega cancelada com sucesso!');
    } catch (error) {
      req.flash('error', error.message);
    }
    res.redirect(`/entregas/${id}`);
  }

  // PATCH /entregas/:id/atribuir
  async atribuirMotorista(req, res) {
    const { id } = req.params;
    const { motoristaId } = req.body;
    try {
      await this.entregasService.atribuirMotorista(Number(id), Number(motoristaId));
      req.flash('success', 'Motorista atribuído com sucesso!');
    } catch (error) {
      req.flash('error', error.message);
    }
    res.redirect(`/entregas/${id}`);
  }
}