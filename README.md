# Projeto Avaliativo - Módulo 2

## Multinacional Guarda-Chuva Farmácias - Backend

### Descrição
Este é o meu projeto final para o **Módulo 2 do DEVinHouse [Clamed] V3**. Desenvolvi um backend em **Node.js** utilizando **TypeScript, Express, TypeORM e PostgreSQL**, com o objetivo de gerenciar **usuários, produtos e movimentações de estoque** entre filiais da organização.

---

## 🛠 Tecnologias Utilizadasa
- **Node.js**
- **TypeScript**
- **Express.js**
- **TypeORM**
- **PostgreSQL**
- **JWT (Json Web Token)**
- **Docker (opcional)**
- **Git e GitHub para versionamento**

---

## 📌 Funcionalidades Principais

✅ **Gerenciamento de Usuários:** Cadastro, listagem, busca por ID e edição de usuários. 
✅ **Autenticação JWT:** Login seguro com token JWT.
✅ **Cadastro e Listagem de Produtos:** Apenas filiais podem cadastrar produtos.
✅ **Movimentação de Produtos entre Filiais:** Registro e controle de transferências entre filiais.
✅ **Segurança:** Middleware de autenticação e autorização.
✅ **Banco de Dados Relacional:** Utiliza PostgreSQL e TypeORM para gerenciamento das entidades.

---

## 📂 Estrutura de Pastas

```
/project
│   README.md    # Documentação do projeto
│   package.json # Dependências do projeto
│   tsconfig.json # Configuração TypeScript
│   .env         # Variáveis de ambiente
│
├── src
│   ├── config         # Configurações do projeto
│   │   ├── winston.ts # Configuração de logs
│   ├── controllers    # Controladores das rotas
│   │   ├── AuthController.ts
│   │   ├── MovementController.ts
│   │   ├── ProductController.ts
│   │   ├── UserController.ts
│   ├── database       # Configuração do banco de dados e migrations
│   │   ├── migrations
│   │   │   ├── 1739911773763-CreateTableUsers.ts
│   │   │   ├── 1740078759121-CreateTableBranches.ts
│   │   │   ├── 1740078766058-CreateTableDrivers.ts
│   │   │   ├── 1740086343920-CreateTableProducts.ts
│   │   │   ├── 1740165198083-CreateTableMovements.ts
│   │   ├── data-source.ts
│   ├── entities       # Modelos de entidades TypeORM
│   │   ├── Branch.ts
│   │   ├── Driver.ts
│   │   ├── Movement.ts
│   │   ├── Product.ts
│   │   ├── User.ts
│   ├── middlewares    # Middleware de segurança e autenticação
│   │   ├── verifyAdminOrDriver.ts
│   │   ├── verifyAuthentication.ts
│   │   ├── verifyBranch.ts
│   ├── routes        # Definição das rotas do Express
│   │   ├── auth.routes.ts
│   │   ├── movements.routes.ts
│   │   ├── product.routes.ts
│   │   ├── user.routes.ts
│   ├── services      # Regras de negócio
│   │   ├── AuthService.ts
│   │   ├── MovementService.ts
│   │   ├── ProductService.ts
│   │   ├── UserService.ts
│   ├── util         # Utilitários gerais
│   │   ├── SendEmail.ts
│   ├── express.d.ts
│   ├── index.ts
```

---

## 📦 Instalação e Execução do Projeto

### 🔹 1. Clone o repositório
```sh
git clone https://github.com/LucasBlunTT/projeto-guarda-chuva-API.git
cd projeto-guarda-chuva-API
```

### 🔹 2. Instale as dependências
```sh
npm install
```

### 🔹 3. Configure o Banco de Dados PostgreSQL
Criei um banco de dados PostgreSQL e defini as variáveis no arquivo **.env**:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=meu_usuario
DB_PASSWORD=minha_senha
DB_NAME=nome_do_banco
JWT_SECRET=minha_chave_secreta
```

### 🔹 4. Rode as Migrations
```sh
npm run typeorm migration:run
```

### 🔹 5. Inicie o Servidor
```sh
npm run dev
```
O servidor estará rodando em **http://localhost:3333** 🚀

---

## 🔹 Uso das Rotas

### 📌 **Autenticação**
- `POST /login` - Autentica um usuário e retorna um token JWT.

### 📌 **Usuários**
- `POST /users` - Cadastro de usuários (Apenas ADMIN).
- `GET /users` - Listagem de usuários (Apenas ADMIN).
- `GET /users/:id` - Buscar usuário por ID (ADMIN ou MOTORISTA dono do ID).
- `PUT /users/:id` - Atualiza dados do usuário (ADMIN ou MOTORISTA dono do ID).
- `PATCH /users/:id/status` - Atualiza o status do usuário (Apenas ADMIN).

### 📌 **Produtos**
- `POST /products` - Cadastro de produtos (Apenas FILIAL).
- `GET /products` - Listagem de produtos.

### 📌 **Movimentações**
- `POST /movements` - Criar uma movimentação de produto.
- `GET /movements` - Listagem de movimentações.
- `PATCH /movements/:id/start` - Atualiza status para "IN_PROGRESS" (Apenas MOTORISTA).
- `PATCH /movements/:id/end` - Atualiza status para "FINISHED" e transfere o produto.

---

## 🎥 Gravação de Vídeo

Para finalizar a entrega, gravei um **vídeo de até 5 minutos** abordando:
1. Objetivo do sistema e demonstração de funcionamento.
2. Como executar o projeto.
3. Como organizei as tarefas no Trello.
4. Estrutura de branches e commits no GitHub.
5. Pontos de melhoria que poderiam ser implementados.

🔗 **O vídeo foi enviado no Google Drive e compartilhado no AVA.**

---

## 📅 Prazo Final de Entrega
📌 **Data de entrega: 03/03/2025 até às 22h**
📌 O projeto foi enviado no GitHub, e os links compartilhados no AVA.
📌 Não alterei o código após a entrega para evitar impacto na avaliação.

---

## 🚀 Melhorias Futuras
- Implementar testes automatizados com Jest.
- Criar um sistema de logs para auditoria.
- Deploy automatizado com CI/CD.

### **Projeto desenvolvido por mim, Lucas da Silva.** 🎯
