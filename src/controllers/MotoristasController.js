export class MotoristasController {
  constructor(motoristasService) {
    this.motoristasService = motoristasService;
  }

  // GET /motoristas
  async listar(req, res) {
    try {
      const motoristas = await this.motoristasService.listarTodos();
      res.render('motoristas/index', { motoristas });
    } catch (error) {
      console.error('Erro em MotoristasController.listar:', error);
      res.status(500).render('motoristas/index', { 
        motoristas: [],
        error_msg: 'Erro ao carregar a lista de motoristas.' 
      });
    }
  }

  // GET /motoristas/novo
  exibirFormularioCriacao(req, res) {
    res.render('motoristas/novo', { dados: {} });
  }

  // POST /motoristas
  async criar(req, res) {
    const { nome, cpf } = req.body;
    try {
      await this.motoristasService.criar({ nome, cpf });
      req.flash('success', 'Motorista cadastrado com sucesso!');
      res.redirect('/motoristas');
    } catch (error) {
      console.error('Erro ao criar motorista:', error);
      res.status(400).render('motoristas/novo', {
        errors: [{ msg: error.message }],
        dados: { nome, cpf }
      });
    }
  }
}