# 🚀 Lighthouse API - Relatórios de Performance e Gerenciamento

Este projeto utiliza o **Unlighthouse** para gerar relatórios de performance e acessibilidade de sites, além de integrar o gerenciamento de sites e usuários utilizando **PostgreSQL** como banco de dados principal. A aplicação inclui uma API que permite executar análises dinâmicas a partir de uma URL fornecida e retorna o relatório em formato **JSON**.

---

## 📋 **Funcionalidades**

- Executa análises de performance e acessibilidade usando Unlighthouse.
- Gera relatórios em formato JSON.
- Permite escolha do dispositivo (**desktop** ou **mobile**).
- Gerenciamento de sites (CRUD).
- Gerenciamento de usuários (CRUD).

---

## 🛠️ **Tecnologias Utilizadas**

- **Node.js** - Ambiente de execução JavaScript.
- **Unlighthouse** - Ferramenta para análise de sites.
- **Next.js** - Framework para criar APIs no backend.
- **PostgreSQL** - Banco de dados relacional.
- **Prisma** - ORM para manipulação do banco de dados.
- **fs-extra** - Manipulação de arquivos e diretórios.
- **child_process** - Execução de comandos CLI.

---

## ⚙️ **Instalação e Configuração**

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/fabioramos-02/Lighthouse
   cd Lighthouse
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Instale o Unlighthouse (globalmente):**

   ```bash
   npm install -g @unlighthouse/cli
   ```

4. **Configure o Banco de Dados PostgreSQL:**

   - Crie um banco de dados chamado `lighthouse`.
   - Atualize o arquivo `.env` com as credenciais do banco:
     ```env
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/lighthouse
     ```

5. **Execute as migrações:**

   ```bash
   npx prisma migrate dev
   ```

6. **⚙️ Estrutura do Projeto**

   ```
   Lighthouse/
   ├── .next/                     # Arquivos compilados do Next.js
   ├── prisma/                    # Configurações e migrações do banco de dados
   │   └── schema.prisma          # Definição do modelo de dados
   ├── node_modules/              # Dependências do projeto
   ├── reports/                   # Pasta onde os relatórios gerados são salvos
   ├── src/                       # Código-fonte principal
   │   └── pages/
   │       └── api/
   │           ├── analisar.js    # API para execução do Unlighthouse
   │           ├── site.js        # API para gerenciamento de sites
   │           └── usuario.js     # API para gerenciamento de usuários
   ├── package.json               # Dependências e scripts do projeto
   ├── .env                       # Variáveis de ambiente
   ├── README.md                  # Documentação do projeto
   └── unlighthouse.config.ts     # Configuração dinâmica do Unlighthouse
   ```

---

## **🚀 Como Usar a API**

### **1. Executando Localmente**

Inicie o servidor local usando o comando:

```bash
npm run dev
```

Por padrão, a API ficará disponível em:
`http://localhost:3000`

### **2. Endpoints Disponíveis**

#### **Analisar Site**
- **Rota:** `GET /api/analisar`
- **Parâmetros:**
  - `siteUrl` (obrigatório): URL do site a ser analisado.
  - `device` (opcional): Tipo de dispositivo (`desktop` ou `mobile`).

#### **Gerenciar Sites**
- **GET /api/site** - Lista todos os sites ou busca por ID.
- **POST /api/site** - Cadastra um novo site.
- **PUT /api/site?id=<id>` - Atualiza um site existente.
- **DELETE /api/site?id=<id>` - Remove um site.

#### **Gerenciar Usuários**
- **GET /api/usuario** - Lista todos os usuários.
- **POST /api/usuario** - Cadastra um novo usuário.
- **PUT /api/usuario** - Atualiza um usuário existente.
- **DELETE /api/usuario** - Remove um usuário pelo ID.

---

## **👨‍💻 Autor**

Desenvolvido por **Fábio Ramos**.  
Entre em contato: [framos@segov.ms.gov.br](mailto:framos@segov.ms.gov.br)  
LinkedIn: [https://www.linkedin.com/in/fabio-ramos-7b8608204/](https://www.linkedin.com/in/fabio-ramos-7b8608204/)
