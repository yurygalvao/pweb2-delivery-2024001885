import express from 'express';
import { criarRotas } from './src/routes/index.js';
import { AppError } from './src/utils/AppError.js';

const app = express();
app.use(express.json());

// Health check exigido pelo contrato de execução (não remova).
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Montagem do roteador da API sob o prefixo /api
app.use('/api', criarRotas());

// Tratamento de erros das regras de negócio ({ "erro": "mensagem" })
app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ erro: err.message });
  }
  return res.status(500).json({ erro: 'Erro interno do servidor' });
});

// 404 para rotas não mapeadas (mantenha por último, antes do listen).
app.use((req, res) => res.status(404).json({ erro: 'recurso não encontrado' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Delivery Tracker rodando em http://localhost:${PORT}`));