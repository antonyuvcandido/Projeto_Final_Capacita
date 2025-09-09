# Guia de Teste da API - Postman Collection

## Como Importar a Coleção

1. Abra o Postman
2. Clique em "Import" no canto superior esquerdo
3. Selecione o arquivo `postman-collection.json`
4. A coleção "API E-commerce - Projeto Final Capacita" será importada

## Configuração Inicial

### Variáveis de Ambiente

A coleção já vem configurada com as seguintes variáveis:

-   `baseUrl`: http://localhost:3001 (ajuste se necessário)
-   Outras variáveis serão preenchidas durante os testes

### Sequência de Testes Recomendada

#### 1. Testar Usuários

1. **Criar Usuário** - Crie um usuário comum
2. **Criar Usuário Admin** - Crie um usuário administrador
3. **Login Usuário** - Faça login e copie o ID do usuário retornado
4. **Listar Usuários** - Verifique se os usuários foram criados
5. **Buscar Usuário por ID** - Use o ID copiado na variável `{{userId}}`

#### 2. Testar Categorias

1. **Criar Categoria - Eletrônicos** - Copie o ID retornado para `{{categoryIdEletronicos}}`
2. **Criar Categoria - Roupas** - Copie o ID retornado para `{{categoryIdRoupas}}`
3. **Criar Categoria - Livros** - Copie o ID retornado para `{{categoryIdLivros}}`
4. **Criar Categoria - Casa e Jardim** - Copie o ID retornado para `{{categoryIdCasaJardim}}`
5. **Listar Categorias** - Verifique todas as categorias criadas

#### 3. Testar Produtos

1. **Criar Produto - Smartphone** - Use o `{{categoryIdEletronicos}}`
2. **Criar Produto - Notebook** - Use o `{{categoryIdEletronicos}}`
3. **Criar Produto - Camiseta** - Use o `{{categoryIdRoupas}}`
4. **Criar Produto - Livro** - Use o `{{categoryIdLivros}}`
5. **Criar Produto - Vaso Decorativo** - Use o `{{categoryIdCasaJardim}}`
6. **Listar Produtos** - Verifique todos os produtos
7. **Produtos por Categoria** - Teste filtrar produtos por categoria

#### 4. Testar Carrinho e Itens

1. **Buscar Carrinho por ID** - Use o ID do carrinho do usuário
2. **Adicionar Item ao Carrinho** - Adicione produtos ao carrinho
3. **Atualizar Item do Carrinho** - Modifique quantidades
4. **Remover Item do Carrinho** - Remova itens

#### 5. Testar Pedidos

1. **Criar Pedido** - Crie um pedido com o carrinho
2. **Listar Pedidos** - Verifique todos os pedidos
3. **Buscar Pedido por ID** - Busque um pedido específico
4. **Atualizar Status do Pedido** - Mude o status do pedido

## Dados de Exemplo Incluídos

### Usuários

-   **Usuário Comum**: João Silva (joao@email.com)
-   **Usuário Admin**: Admin Sistema (admin@email.com)

### Categorias

-   **Eletrônicos**: Produtos eletrônicos em geral
-   **Roupas**: Vestuário masculino e feminino
-   **Livros**: Livros físicos e digitais
-   **Casa e Jardim**: Produtos para decoração e jardinagem

### Produtos

-   **Smartphone Samsung Galaxy S23**: R$ 2.499,99
-   **Notebook Dell Inspiron 15**: R$ 3.299,90
-   **Camiseta Básica Cotton**: R$ 39,90
-   **Clean Code - Robert Martin**: R$ 89,90
-   **Vaso Decorativo Cerâmica**: R$ 79,90

## Dicas Importantes

1. **Copie os IDs**: Após criar recursos, copie os IDs retornados para usar nas variáveis
2. **Ordem de Execução**: Siga a sequência recomendada para evitar erros de dependência
3. **Verificação**: Sempre verifique as respostas para confirmar que os dados foram criados/atualizados
4. **Status Codes**:
    - 200/201: Sucesso
    - 400: Erro de validação
    - 404: Recurso não encontrado
    - 500: Erro interno do servidor

## Estrutura da API

### Endpoints Disponíveis

#### Usuários (`/api/users`)

-   `POST /` - Criar usuário
-   `POST /login` - Login
-   `GET /` - Listar usuários
-   `GET /:id` - Buscar por ID
-   `PUT /:id` - Atualizar usuário
-   `DELETE /:id` - Deletar usuário

#### Categorias (`/api/categories`)

-   `POST /` - Criar categoria
-   `GET /` - Listar categorias
-   `GET /:id/products` - Produtos por categoria
-   `PUT /:id` - Atualizar categoria
-   `DELETE /:id` - Deletar categoria

#### Produtos (`/api/products`)

-   `POST /` - Criar produto
-   `GET /` - Listar produtos
-   `GET /:id` - Buscar por ID
-   `PUT /:id` - Atualizar produto
-   `DELETE /:id` - Deletar produto

#### Carrinho (`/api/carts`)

-   `GET /:id` - Buscar carrinho
-   `PUT /:id` - Atualizar carrinho
-   `PATCH /:id` - Atualizar carrinho (parcial)

#### Itens do Carrinho (`/api/cart-items`)

-   `POST /` - Adicionar item
-   `PUT /:id` - Atualizar item
-   `PATCH /:id` - Atualizar item (parcial)
-   `DELETE /:id` - Remover item

#### Pedidos (`/api/orders`)

-   `POST /` - Criar pedido
-   `GET /` - Listar pedidos
-   `GET /:id` - Buscar por ID
-   `PUT /:id/status` - Atualizar status

## Troubleshooting

### Problemas Comuns

1. **Erro 404**: Verifique se o servidor está rodando na porta correta
2. **Erro 400**: Verifique se todos os campos obrigatórios estão preenchidos
3. **Erro de relacionamento**: Certifique-se de que os IDs das categorias/usuários existem

### Verificação do Servidor

Antes de testar, certifique-se de que:

1. O servidor backend está rodando
2. O banco de dados está conectado
3. As migrações do Prisma foram executadas

```bash
# No diretório backend
npm start
# ou
npm run dev
```
