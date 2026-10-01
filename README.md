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