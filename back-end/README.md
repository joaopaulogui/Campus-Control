# Campus Control — Back-end

API HTTP do Campus Control. O objetivo deste repositório é o servidor: regras de negócio, persistência e endpoints.

O banco já está modelado no Prisma. Quem for implementar features deve criar rotas, casos de uso e as implementações Prisma dos repositórios — **não** recriar as tabelas do zero.

## Stack

- Node.js + TypeScript (ESM)
- Express
- Prisma 7 + PostgreSQL 16
- Docker Compose (banco local)
- ESLint (config Rocketseat)

## Pré-requisitos

- Node.js 20 ou superior
- npm
- Docker Desktop (ou Docker Engine + Compose)

A porta **5432** costuma estar ocupada por outro Postgres. Por isso o banco deste projeto sobe na **5433**.

| Serviço     | Porta | Para quê                          |
|-------------|-------|-----------------------------------|
| API         | 3333  | `npm run dev`                     |
| PostgreSQL  | 5433  | conexão local (dentro do container continua 5432) |

## Subir o projeto

Na pasta `back-end`:

```bash
npm install
cp .env.example .env
npm run db:up
npx prisma migrate dev
npm run dev
```

Confirme:

- API: [http://localhost:3333](http://localhost:3333) deve responder `{ "ok": true }`
- Banco: `docker compose ps` deve mostrar o container `postgres` como `running`

Se o `migrate` pedir um nome e a migration `init` já existir, o comando só aplica o que falta. Não apague a pasta `prisma/migrations`.

## Variáveis de ambiente

O arquivo `.env` **não entra no Git**. Cada pessoa copia o exemplo:

```bash
cp .env.example .env
```

O valor local padrão (igual ao `docker-compose.yml`):

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/campus?schema=public"
```

- usuário: `admin`
- senha: `admin`
- banco: `campus`
- host: `localhost:5433`

Se o Postgres for o da equipe (não o Docker local), só troque a `DATABASE_URL`. Não commite senha de produção.

## Scripts

| Comando              | O que faz                                      |
|----------------------|------------------------------------------------|
| `npm run dev`        | Sobe a API com reload (`tsx watch`)            |
| `npm run lint`       | ESLint com `--fix` em `src`                    |
| `npm run db:up`      | Sobe o Postgres (`docker compose up -d`)       |
| `npm run db:down`    | Para o container (os dados no volume continuam)|
| `npm run db:migrate` | Cria/aplica migrations                         |
| `npm run db:studio`  | Abre o Prisma Studio (GUI das tabelas)         |

`db:reset` no `package.json` derruba e sobe o Compose de novo. **Não apaga o volume** — não é um wipe do banco. Evite usar no dia a dia.

## Estrutura

```
src/
  entities/        domínio (User, Room, Floor, …) — não misturar Prisma aqui
  repositories/    interfaces (contrato). Implementações Prisma ainda não existem
  use-cases/       regras de aplicação (ainda sem HTTP)
  lib/prisma.ts    cliente Prisma único — importe daqui, não dê new PrismaClient() em vários arquivos
  server.ts        Express (hoje só um GET / de health)

prisma/
  schema.prisma    modelos = tabelas
  migrations/      histórico do banco — versionar no Git

docker-compose.yml Postgres 16 local
.env.example       modelo da DATABASE_URL
```

Código-fonte é `src/`. A pasta `dist/` é saída do `tsc` — ignore, não edite.

## Por onde começar a codar

1. Implementar o repositório Prisma da entidade (ex.: `src/repositories/prisma/prisma-users-repository.ts`), **implementando** a interface já existente em `src/repositories/`.
2. Usar o cliente de `src/lib/prisma.ts`.
3. Injetar essa implementação no use case.
4. Expor uma rota no Express (`src/server.ts` ou, melhor, uma pasta `http/` / `routes/` quando crescer).

O use case **não** importa Prisma direto. Ele depende da interface.

## Banco (Prisma)

Schema e migration `init` já cobrem:

User, Floor, Room, AirConditioner, Schedule, Item, Loan, Chat, ChatParticipant, Message.

Alterou o `schema.prisma`?

```bash
npx prisma migrate dev --name nome_claro_da_mudanca
```

Isso gera SQL em `prisma/migrations` **e** atualiza o client. Sempre commite a pasta de migrations junto com a mudança no schema.

Ver dados:

```bash
npm run db:studio
```

## Problemas comuns

**`Bind for 0.0.0.0:5432 failed: port is already allocated`**  
O `docker-compose.yml` deve mapear `"5433:5432"` (host 5433 → container 5432). Não use `"5432:5432"` nem `"5433:5433"`.

**`Can't reach database server`**  
O container não está up, ou a `.env` aponta para a porta errada. Rode `npm run db:up` e confira se a URL usa `:5433`.

**`Environment variable not found: DATABASE_URL`**  
Falta o `.env` na raiz do `back-end`. Copie o `.env.example`.

**Colega clonou e as tabelas não existem**  
`npx prisma migrate dev` (ou `npx prisma migrate deploy` se for só aplicar as migrations já commitadas).

## O que não versionar

- `.env`
- `node_modules/`
- `dist/`

O que **precisa** ir no Git: `prisma/schema.prisma`, `prisma/migrations/`, `docker-compose.yml`, `.env.example`, `src/`.
