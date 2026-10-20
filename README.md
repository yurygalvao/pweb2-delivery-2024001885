# Delivery Tracker — Atividade 06 (Motoristas, Contratos & Inversão de Dependências)

## Diagrama de Composição de Dependências (Composition Root)

```
[ Database ]
     ▲
     ├──────────────────────────┐
[ EntregasRepository ]  [ MotoristasRepository ]
     ▲                          ▲
     ├─────────────┐  ┌─────────┤
[ EntregasService ]    [ MotoristasService ]
     ▲                          ▲
[ EntregasController ]  [ MotoristasController ]
```

## Endpoints da API

### Entregas (`/api/entregas`)
- `POST /api/entregas` — Criar entrega
- `GET /api/entregas` — Listar entregas (aceita `?status=`)
- `GET /api/entregas/:id` — Buscar entrega por ID
- `PATCH /api/entregas/:id/avancar` — Avançar status da entrega
- `PATCH /api/entregas/:id/cancelar` — Cancelar entrega
- `PATCH /api/entregas/:id/atribuir` — Atribuir motorista à entrega
- `GET /api/entregas/:id/historico` — Obter histórico da entrega

### Motoristas (`/api/motoristas`)
- `POST /api/motoristas` — Cadastrar motorista
- `GET /api/motoristas` — Listar motoristas
- `GET /api/motoristas/:id` — Buscar motorista por ID
- `GET /api/motoristas/:id/entregas` — Listar entregas de um motorista (aceita `?status=`)

# Delivery Tracker — Capitulo 7 (Prisma ORM + SQLite)

Aplicação de gerenciamento de entregas e motoristas refatorada para utilizar persistência relacional com SQLite e Prisma ORM, mantendo a arquitetura em camadas e Inversão de Dependências (Composition Root).

---

## Arquitetura (Composition Root)

```
[ Database (SQLite via Prisma) ]
▲
├──────────────────────────┐
[ EntregasRepositoryPrisma ]  [ MotoristasRepositoryPrisma ]
▲                          ▲
├─────────────┐  ┌─────────┤
[ EntregasService ]    [ MotoristasService ]
▲                          ▲
[ EntregasController ]  [ MotoristasController ]
```

---

## Tecnologias

- Node.js & Express
- Prisma ORM
- SQLite

---

## Como Executar o Projeto

1. Instalar as dependências:
   ```bash
   npm install

Configurar o arquivo de variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
DATABASE_URL="file:./dev.db"

Executar as Migrations do Banco de Dados:
npx prisma migrate dev

Iniciar o Servidor:
npm start

Executar os Testes do Autograder:
npm run check

Endpoints da API
Entregas (/api/entregas)
POST /api/entregas — Criar entrega

GET /api/entregas — Listar entregas (aceita ?status=)

GET /api/entregas/:id — Buscar entrega por ID

PATCH /api/entregas/:id/avancar — Avançar status da entrega

PATCH /api/entregas/:id/cancelar — Cancelar entrega

PATCH /api/entregas/:id/atribuir — Atribuir motorista à entrega

GET /api/entregas/:id/historico — Obter histórico da entrega

Motoristas (/api/motoristas)
POST /api/motoristas — Cadastrar motorista

GET /api/motoristas — Listar motoristas

GET /api/motoristas/:id — Buscar motorista por ID

GET /api/motoristas/:id/entregas — Listar entregas de um motorista (aceita ?status=)


---

### 2. Ficheiro `package.json` (Conteúdo Completo)

```json
{
  "name": "pweb2-delivery-cap04",
  "version": "1.0.0",
  "description": "Delivery Tracker — Exercício do Cap. 4 (arquitetura em camadas + Repository/DI).",
  "type": "module",
  "scripts": {
    "postinstall": "prisma generate && (prisma skills sync || exit 0)",
    "prestart": "prisma migrate deploy",
    "start": "node server.js",
    "dev": "node --watch server.js",
    "check": "node autograder/check.mjs"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "express": "^4.21.2"
  },
  "devDependencies": {
    "prisma": "^5.22.0"
  }
}