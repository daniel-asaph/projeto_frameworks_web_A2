# Sistema de Locação de Veículos

Projeto da disciplina **Programação com Frameworks Web**: API REST em Node.js/Express com Prisma ORM e MySQL, autenticação JWT/bcrypt e interface React.

## Integrantes

| Integrante | Nome | Responsabilidade principal |
|---|---|---|
| 1 | Samuel | Banco de dados e Prisma |
| 2 | Matheus | Backend: usuários e autenticação |
| 3 | Luan | Backend: veículos e locações |
| 4 | Daniel | Frontend React |

## Requisitos

- Node.js 20 ou superior (testado com 26)
- MySQL 8 (testado com 8.4)

## Banco de dados

1. Crie o banco no MySQL (Workbench ou terminal):
   ```sql
   CREATE DATABASE locadora_veiculos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Em `backend-car/`, copie `.env.example` para `.env` e preencha `DATABASE_URL` com seu usuário e senha do MySQL:
   ```
   DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/locadora_veiculos"
   ```
   O usuário precisa de permissão para criar bancos, pois o `prisma migrate dev` usa um banco temporário (shadow database).
3. Instale as dependências, aplique as migrations e carregue os dados de exemplo:
   ```bash
   cd backend-car
   npm install
   npx prisma migrate deploy
   npm run db:seed
   npm run db:verificar
   ```

Usuários de exemplo: `samuel@locadora.com`, `matheus@locadora.com`, `luan@locadora.com`, `daniel@locadora.com` — senha `123456`.

Modelos, relações, restrições e exemplos de consultas para os Services: [docs/banco-de-dados.md](docs/banco-de-dados.md).
