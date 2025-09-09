# Documentação da API

Esta documentação descreve todas as rotas disponíveis na API, seus parâmetros, respostas e exemplos de uso.

## Índice
- [Usuários](#usuários)
- [Produtos](#produtos)
- [Categorias](#categorias)
- [Pedidos](#pedidos)

## Usuários

### POST /users
> Criar um novo usuário

**Requisição:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-do-usuario",
  "nome": "João Silva",
  "email": "joao@email.com",
  "admin": false,
  "criadoEm": "2025-09-09T10:00:00.000Z",
  "editadoEm": "2025-09-09T10:00:00.000Z"
}
```

### GET /users
> Listar todos os usuários

**Resposta (200):**
```json
[
  {
    "id": "uuid-do-usuario",
    "nome": "João Silva",
    "email": "joao@email.com",
    "admin": false,
    "criadoEm": "2025-09-09T10:00:00.000Z",
    "editadoEm": "2025-09-09T10:00:00.000Z"
  }
]
```

### GET /users/:id
> Buscar usuário por ID

**Resposta (200):**
```json
{
  "id": "uuid-do-usuario",
  "nome": "João Silva",
  "email": "joao@email.com",
  "admin": false,
  "criadoEm": "2025-09-09T10:00:00.000Z",
  "editadoEm": "2025-09-09T10:00:00.000Z",
  "endereco": {
    "id": "uuid-do-endereco",
    "logradouro": "Rua Exemplo",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "CEP": "01001-000",
    "pais": "Brasil"
  }
}
```

### PUT /users/:id
> Atualizar dados do usuário

**Requisição:**
```json
{
  "nome": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "senha": "654321"
}
```

**Resposta (200):**
```json
{
  "id": "uuid-do-usuario",
  "nome": "João Silva Atualizado",
  "email": "joao.novo@email.com",
  "admin": false,
  "criadoEm": "2025-09-09T10:00:00.000Z",
  "editadoEm": "2025-09-09T10:30:00.000Z"
}
```

### DELETE /users/:id
> Deletar usuário

**Resposta (204):** No content

## Produtos

### POST /products
> Criar um novo produto

**Requisição:**
```json
{
  "nome": "Smartphone XYZ",
  "preco": 1999.99,
  "quantidade": 10,
  "descricao": "Smartphone último modelo",
  "idCategoria": "uuid-da-categoria"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-do-produto",
  "nome": "Smartphone XYZ",
  "preco": 1999.99,
  "quantidade": 10,
  "descricao": "Smartphone último modelo",
  "idCategoria": "uuid-da-categoria",
  "editadoEm": "2025-09-09T10:00:00.000Z"
}
```

### GET /products
> Listar todos os produtos

**Resposta (200):**
```json
[
  {
    "id": "uuid-do-produto",
    "nome": "Smartphone XYZ",
    "preco": 1999.99,
    "quantidade": 10,
    "descricao": "Smartphone último modelo",
    "idCategoria": "uuid-da-categoria",
    "editadoEm": "2025-09-09T10:00:00.000Z",
    "categoria": {
      "id": "uuid-da-categoria",
      "nome": "Eletrônicos",
      "descricao": "Produtos eletrônicos em geral"
    }
  }
]
```

### GET /products/:id
> Buscar produto por ID

**Resposta (200):**
```json
{
  "id": "uuid-do-produto",
  "nome": "Smartphone XYZ",
  "preco": 1999.99,
  "quantidade": 10,
  "descricao": "Smartphone último modelo",
  "idCategoria": "uuid-da-categoria",
  "editadoEm": "2025-09-09T10:00:00.000Z",
  "categoria": {
    "id": "uuid-da-categoria",
    "nome": "Eletrônicos",
    "descricao": "Produtos eletrônicos em geral"
  }
}
```

### PUT /products/:id
> Atualizar dados do produto

**Requisição:**
```json
{
  "nome": "Smartphone XYZ Pro",
  "preco": 2499.99,
  "quantidade": 5,
  "descricao": "Smartphone último modelo versão Pro",
  "idCategoria": "uuid-da-categoria"
}
```

**Resposta (200):**
```json
{
  "id": "uuid-do-produto",
  "nome": "Smartphone XYZ Pro",
  "preco": 2499.99,
  "quantidade": 5,
  "descricao": "Smartphone último modelo versão Pro",
  "idCategoria": "uuid-da-categoria",
  "editadoEm": "2025-09-09T10:30:00.000Z"
}
```

### DELETE /products/:id
> Deletar produto

**Resposta (204):** No content

## Categorias

### POST /categories
> Criar uma nova categoria

**Requisição:**
```json
{
  "nome": "Eletrônicos",
  "descricao": "Produtos eletrônicos em geral"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-da-categoria",
  "nome": "Eletrônicos",
  "descricao": "Produtos eletrônicos em geral"
}
```

### GET /categories
> Listar todas as categorias

**Resposta (200):**
```json
[
  {
    "id": "uuid-da-categoria",
    "nome": "Eletrônicos",
    "descricao": "Produtos eletrônicos em geral"
  }
]
```

### GET /categories/:id/products
> Listar produtos de uma categoria específica

**Resposta (200):**
```json
[
  {
    "id": "uuid-do-produto",
    "nome": "Smartphone XYZ",
    "preco": 1999.99,
    "quantidade": 10,
    "descricao": "Smartphone último modelo",
    "idCategoria": "uuid-da-categoria",
    "editadoEm": "2025-09-09T10:00:00.000Z",
    "categoria": {
      "id": "uuid-da-categoria",
      "nome": "Eletrônicos",
      "descricao": "Produtos eletrônicos em geral"
    }
  }
]
```

## Pedidos

### POST /orders
> Criar um novo pedido

**Requisição:**
```json
{
  "idCarrinho": "uuid-do-carrinho"
}
```

**Resposta (201):**
```json
{
  "id": "uuid-do-pedido",
  "idCarrinho": "uuid-do-carrinho",
  "idUsuario": "uuid-do-usuario",
  "valorTotal": 1999.99,
  "criadoEm": "2025-09-09T10:00:00.000Z"
}
```

### GET /orders
> Listar todos os pedidos

**Resposta (200):**
```json
[
  {
    "id": "uuid-do-pedido",
    "idCarrinho": "uuid-do-carrinho",
    "idUsuario": "uuid-do-usuario",
    "valorTotal": 1999.99,
    "criadoEm": "2025-09-09T10:00:00.000Z",
    "usuario": {
      "nome": "João Silva",
      "email": "joao@email.com"
    },
    "carrinho": {
      "itens": [
        {
          "quantidade": 1,
          "produto": {
            "nome": "Smartphone XYZ",
            "preco": 1999.99
          }
        }
      ]
    }
  }
]
```

### GET /orders/:id
> Buscar pedido por ID

**Resposta (200):**
```json
{
  "id": "uuid-do-pedido",
  "idCarrinho": "uuid-do-carrinho",
  "idUsuario": "uuid-do-usuario",
  "valorTotal": 1999.99,
  "criadoEm": "2025-09-09T10:00:00.000Z",
  "usuario": {
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  "carrinho": {
    "itens": [
      {
        "quantidade": 1,
        "produto": {
          "nome": "Smartphone XYZ",
          "preco": 1999.99
        }
      }
    ]
  }
}
```

### PUT /orders/:id/status
> Atualizar status do pedido

**Requisição:**
```json
{
  "status": "ENTREGUE"
}
```

**Resposta (200):**
```json
{
  "id": "uuid-do-pedido",
  "idCarrinho": "uuid-do-carrinho",
  "idUsuario": "uuid-do-usuario",
  "valorTotal": 1999.99,
  "status": "ENTREGUE",
  "criadoEm": "2025-09-09T10:00:00.000Z"
}
```