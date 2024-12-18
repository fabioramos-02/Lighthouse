# 🚀 Lighthouse API - Relatórios de Performance

Este projeto utiliza o **Unlighthouse** para gerar relatórios de performance e acessibilidade de sites. A aplicação inclui uma API que permite executar análises dinâmicas a partir de uma URL fornecida e retorna o relatório em formato **JSON**.

---

## 📋 **Funcionalidades**

- Executa análises de performance e acessibilidade usando Unlighthouse.
- Gera relatórios em formato JSON.
- Permite escolha do dispositivo (**desktop** ou **mobile**).
- API configurada para executar com comandos CLI dinamicamente.

---

## 🛠️ **Tecnologias Utilizadas**

- **Node.js** - Ambiente de execução JavaScript.
- **Unlighthouse** - Ferramenta para análise de sites.
- **Next.js** - Framework para criar APIs no backend.
- **fs-extra** - Manipulação de arquivos e diretórios.
- **child_process** - Execução de comandos CLI.

---

## ⚙️ **Instalação e Configuração**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/fabioramos-02/Lighthouse
   cd Lighthouse

2. **Instale as dependências:**
    ```bash
    npm install

3. **Instale Instale o Unlighthouse (globalmente):**
    ```bash
    npm install -g @unlighthouse/cli
4. **⚙️ Estrutura do Projeto**
    Lighthouse/
    ├── .next/                     # Arquivos compilados do Next.js
    ├── .unlighthouse/             # Configurações locais do Unlighthouse
    ├── node_modules/              # Dependências do projeto
    ├── reports/                   # Pasta onde os relatórios gerados são salvos
    │   └── resultado.json/        # Resultados e relatórios em JSON
    ├── src/                       # Código-fonte principal
    │   └── pages/
    │       └── api/
    │           └── analisar.js    # API para execução do Unlighthouse
    ├── unlighthouse.config.ts     # Configuração dinâmica do Unlighthouse
    ├── package.json               # Dependências e scripts do projeto
    ├── package-lock.json          # Bloqueio de versões de dependências
    ├── .gitignore                 # Arquivos ignorados pelo Git
    └── README.md                  # Documentação do projeto

## **🚀 Como Usar a API**

1. **Executando Localmente**
    Inicie o servidor local usando o comando:
    ```bash
    npm run dev

    Por padrão, a API ficará disponível em:
    http://localhost:3000/api/analisar

2. **Endpoint da API**
    Rota: GET /api/analisar
    Parâmetros:
    siteUrl (obrigatório): URL do site a ser analisado.
    device (opcional): Tipo de dispositivo. Valores possíveis: desktop (padrão) ou mobile.

## **Exemplo de Requisição:**
    ```bash
    GET http://localhost:3000/api/analisar?siteUrl=https://mscultural.ms.gov.br&device=mobile


## **👨‍💻 Autor**
    Desenvolvido por Fabio Ramos.
    Entre em contato: framos@segov.ms.gov.br



