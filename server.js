import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

import { prisma } from './src/database/prisma.js';
import { EntregasRepositoryPrisma } from './src/repositories/EntregasRepositoryPrisma.js';
import { MotoristasRepositoryPrisma } from './src/repositories/MotoristasRepositoryPrisma.js';
import { EntregasService } from './src/services/EntregasService.js';
import { MotoristasService } from './src/services/MotoristasService.js';
import { EntregasController } from './src/controllers/EntregasController.js';
import { MotoristasController } from './src/controllers/MotoristasController.js';
import { criarRotas } from './src/routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/base');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
  secret: 'delivery-tracker-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  res.locals.errors = req.flash('errors');
  next();
});

const entregasRepo = new EntregasRepositoryPrisma(prisma);
const motoristasRepo = new MotoristasRepositoryPrisma(prisma);

const motoristasService = new MotoristasService(motoristasRepo);
const entregasService = new EntregasService(entregasRepo, motoristasRepo);

const entregasController = new EntregasController(entregasService, motoristasService);
const motoristasController = new MotoristasController(motoristasService);

app.use('/', criarRotas(entregasController, motoristasController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});