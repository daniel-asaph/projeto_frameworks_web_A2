# Sistema de Locação de Veículos — Projeto Prático A2

Sistema web Full Stack para gerenciamento de locação de veículos desenvolvido para a disciplina de **Programação com Frameworks Web**. A aplicação é composta por uma **API REST** em Node.js + Express com persistência relacional via **Prisma ORM** e **MySQL**, autenticação baseada em **JWT** e **bcrypt**, e interface de usuário em **React + TypeScript + Vite**.

---

## Integrantes do Grupo

- Daniel Asaph
- Luan Silveira
- Matheus Nunes
- Samuel Lucas

---

## Descrição do Sistema e Funcionalidades

O sistema permite que uma locadora cadastre sua frota de veículos, controle a disponibilidade em tempo real e registre locações e devoluções realizadas por usuários autenticados.

### Funcionalidades Principais

1. **Autenticação e Autorização de Usuários (`/api/auth`)**
   - Cadastro de novos usuários (`POST /api/auth/register`) com validação de campos obrigatórios e e-mail único.
   - Armazenamento seguro de senhas utilizando hash com `bcrypt` (custo 10) e omissão da senha nas respostas da API utilizando `select` do Prisma.
   - Login (`POST /api/auth/login`) com verificação de credenciais via `bcrypt.compare` e geração de token **JWT** (`expiresIn: '1h'`, payload `{ sub: usuario.id }`).
   - Middleware de autenticação (`autenticarToken` em `src/middlewares/authMiddleware.js`) que valida o cabeçalho `Authorization: Bearer <token>`, verifica a assinatura com `jwt.verify` e injeta o identificador do usuário autenticado em `req.usuarioId`.

2. **Gerenciamento de Frota de Veículos (`/api/veiculos`)**
   - Cadastro de veículos (`POST /api/veiculos`) validando campos obrigatórios, placa única e valor da diária positivo (`> 0`).
   - Listagem de veículos (`GET /api/veiculos`) exibindo marca, modelo, placa, ano, valor da diária e disponibilidade (`Disponível` / `Locado`).
   - Consulta filtrada apenas de veículos disponíveis para locação (`GET /api/veiculos?disponivel=true` ou `GET /api/veiculos/disponiveis`).

3. **Gestão de Locações (`/api/locacoes`)**
   - Registro de locação (`POST /api/locacoes`) associando o usuário autenticado (`req.usuarioId`) ao veículo escolhido e ao período informado (`dataInicio` e `dataDevolucaoPrevista`).
   - Validação de datas (data prevista de devolução obrigatoriamente posterior à data de início) e verificação de existência e disponibilidade do veículo.
   - Cálculo automático do valor total no backend com base na duração contratada, contabilizando qualquer fração de 24 horas como uma diária completa (`Math.ceil(diferencaHoras / 24)`).
   - Controle de consistência e concorrência via transação atômica (`prisma.$transaction`) combinada com atualização condicional (`tx.veiculo.updateMany` verificando `disponibilidade: true`), impedindo duas locações ativas simultâneas para o mesmo veículo.
   - Listagem do histórico de locações do usuário autenticado (`GET /api/locacoes`), incluindo locações ativas e finalizadas, recuperando os dados do veículo relacionado com `include: { veiculo: true }`.
   - Finalização de locação (`PATCH /api/locacoes/:id/finalizar`) com controle de acesso por proprietário (`locacao.usuarioId !== Number(usuarioId)` retorna `HTTP 403`), impedimento de dupla finalização, registro de `dataDevolucaoEfetiva`, alteração do status para `"FINALIZADA"` e liberação do veículo (`disponibilidade: true`) dentro de uma transação do Prisma.

---

## Arquitetura e Decisões de Implementação

### Backend (`backend-car`)
O backend segue a separação de responsabilidades exigida:
- **Routes (`src/routes/`)**: Mapeamento dos endpoints HTTP (`authRoutes.js`, `veiculoRoutes.js`, `locacaoRoutes.js`) e proteção das rotas de veículos e locações com o middleware `autenticarToken`.
- **Middleware (`src/middlewares/authMiddleware.js`)**: Validação do token JWT enviado no header `Authorization: Bearer <token>` e extração segura do `req.usuarioId`.
- **Controllers (`src/controllers/`)**: Manipulação de entrada e saída HTTP (`req`, `res`) e retorno dos códigos de status adequados (`200`, `201`, `400`, `401`, `403`, `404`, `409`, `500`).
- **Services (`src/services/`)**: Isolamento das regras de negócio, validações, cálculos de diárias, hashing de senhas e comunicação com o banco via Prisma Client (`src/prismaClient.js`).

### Modelagem do Banco de Dados (`backend-car/prisma/schema.prisma`)
- **`Usuario`**: `id` (PK, autoincrement), `nome`, `email` (Unique), `senha` (hash bcrypt), `dataCadastro` (default `now()`), relacionamento 1:N com `Locacao`.
- **`Veiculo`**: `id` (PK, autoincrement), `marca`, `modelo`, `placa` (Unique), `ano`, `valorDiaria`, `disponibilidade` (default `true`), relacionamento 1:N com `Locacao`.
- **`Locacao`**: `id` (PK, autoincrement), `dataInicio`, `dataDevolucaoPrevista`, `dataDevolucaoEfetiva` (opcional/nullable), `valorTotal`, `status` (default `"ATIVA"`), chaves estrangeiras `usuarioId` (FK para `Usuario.id`) e `veiculoId` (FK para `Veiculo.id`).

### Frontend (`frontend/locacao_veiculos`)
- Desenvolvido em **React** com **TypeScript** e **Vite**, organizado em componentes reutilizáveis (`src/components/`) e páginas (`src/pages/`).
- Integração com a API REST via **Axios** (`src/api/api.ts`), utilizando interceptor de requisição para enviar automaticamente o cabeçalho `Authorization: Bearer <token>` a partir do `localStorage`.
- Uso de estados (`useState`, `useEffect`), eventos e formulários controlados, atualizando reativamente a listagem de veículos e o histórico de locações após cada operação.

---

## Requisitos de Execução

- **Node.js** (v18 ou superior)
- **npm**
- **MySQL Server** (v8.0 ou superior)

---

## Instalação, Configuração do Banco e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/daniel-asaph/projeto_frameworks_web_A2.git
cd projeto_frameworks_web_A2
```

### 2. Configurar e iniciar o Backend (`backend-car`)

Entre na pasta do backend e instale as dependências:

```bash
cd backend-car
npm install
```

Crie o arquivo `.env` a partir do arquivo `.env.example`:

```bash
cp .env.example .env
```

Configure as variáveis no arquivo `backend-car/.env` de acordo com o seu MySQL local:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/frameworks_web_a2"

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA
DB_NAME=frameworks_web_a2

PORT=3000
JWT_SECRET="sua_chave_secreta_jwt_aqui"
```

Execute as migrations do Prisma para criar o banco e as tabelas no MySQL:

```bash
npx prisma migrate dev
```

Inicie o servidor do backend:

```bash
npm run dev
```

A API estará em execução em `http://localhost:3000`.

### 3. Configurar e iniciar o Frontend (`frontend/locacao_veiculos`)

Em outro terminal, acesse o diretório do frontend e instale as dependências:

```bash
cd frontend/locacao_veiculos
npm install
```

Inicie o servidor de desenvolvimento React (Vite):

```bash
npm run dev
```

Acesse a interface no navegador pelo endereço indicado no terminal (por padrão, `http://localhost:5173`).

---

## Endpoints da API REST

| Método | Endpoint | Autenticação | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | Pública | Cadastra um novo usuário com senha criptografada (`bcrypt`). |
| `POST` | `/api/auth/login` | Pública | Autentica o usuário e retorna `{ usuario, token }`. |
| `POST` | `/api/veiculos` | `Bearer <JWT>` | Cadastra um novo veículo com placa única e diária positiva. |
| `GET` | `/api/veiculos` | `Bearer <JWT>` | Lista todos os veículos (suporta `?disponivel=true`). |
| `GET` | `/api/veiculos/disponiveis` | `Bearer <JWT>` | Lista apenas os veículos com `disponibilidade: true`. |
| `POST` | `/api/locacoes` | `Bearer <JWT>` | Registra uma nova locação e torna o veículo indisponível. |
| `GET` | `/api/locacoes` | `Bearer <JWT>` | Lista as locações do usuário autenticado com `include: { veiculo: true }`. |
| `PATCH` | `/api/locacoes/:id/finalizar` | `Bearer <JWT>` | Finaliza uma locação ativa do usuário e libera o veículo. |
