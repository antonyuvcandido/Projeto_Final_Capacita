# Projeto Loja Virtual

Este é um projeto fullstack de uma loja virtual com backend em Node.js e frontend em React.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## Configuração e Execução

### 1. Configuração do Banco de Dados PostgreSQL

#### Usando pgAdmin:

1. Abra o pgAdmin e conecte-se ao seu servidor PostgreSQL
2. Crie um novo banco de dados:
   - Clique com o botão direito em "Databases" > "Create" > "Database..."
   - Nome do banco: `loja`
   - Clique em "Save"

#### Ou usando comandos SQL:

```sql
-- Criar o banco de dados
CREATE DATABASE loja;

-- Opcional: Criar um novo usuário (se não quiser usar o padrão postgres)
CREATE USER meu_usuario WITH PASSWORD 'minha_senha';
GRANT ALL PRIVILEGES ON DATABASE loja TO meu_usuario;
```

### 2. Configuração do Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   # No Windows:
   copy .env.example .env
   
   # No Linux/Mac:
   cp .env.example .env
   ```

4. Edite o arquivo `.env` com suas configurações do PostgreSQL:
   ```
   DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/loja"
   ```

5. Execute as migrações do Prisma (certifique-se de que o banco 'loja' já existe):
   ```bash
   npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma
   ```

6. Inicie o servidor backend:
   ```bash
   npm run dev
   ```
   O servidor estará rodando em: http://localhost:3001

### 3. Configuração do Frontend

1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   # No Windows:
   copy .env.example .env
   
   # No Linux/Mac:
   cp .env.example .env
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O frontend estará rodando em: http://localhost:5173 (ou a porta informada no terminal)

## Verificando a Conexão Frontend-Backend

Para verificar se o frontend está se comunicando corretamente com o backend:

1. Certifique-se de que ambos os servidores estão rodando
2. Abra o frontend no navegador
3. Abra as ferramentas de desenvolvedor (F12)
4. Navegue até a aba "Network/Rede"
5. Interaja com a aplicação (ex: tente fazer login)
6. Observe as requisições HTTP para o backend:
   - Deve haver chamadas para `http://localhost:3001/api/...`
   - Verifique o status das chamadas (200 OK indica sucesso)

## Solução de Problemas Comuns

### Erro: "Prisma Schema não encontrado"
Se o Prisma não encontrar o schema, use o caminho completo:
```bash
npx prisma migrate dev --name init --schema=./src/prisma/schema.prisma
```

### Erro: "Falha na conexão com o banco de dados"
- Verifique se o PostgreSQL está rodando
- Confirme se a string de conexão no arquivo `.env` está correta
- Teste a conexão com o comando:
  ```bash
  npx prisma db pull --schema=./src/prisma/schema.prisma
  ```

### Erro: "CORS não permitido"
Se o frontend receber erros de CORS:
- Verifique se o backend está configurado para permitir requisições do domínio do frontend
- Confirme se a URL da API no frontend está correta

### Erro: "Cannot find module..."
Se ocorrer erro de módulo não encontrado:
```bash
npm install
```

## Funcionalidades da Aplicação

- Cadastro e login de usuários
- Gerenciamento de produtos
- Carrinho de compras
- Histórico de transações
- Gestão de estoque

Após iniciar a aplicação, crie uma conta de usuário e explore as funcionalidades!