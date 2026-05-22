# Cash Management - React Bootstrap App

Este é um projeto React criado para transformar os arquivos HTML do `sticht` em uma aplicação React usando Bootstrap.

## Estrutura do Projeto

```
cash-management/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Types.jsx
│   │   └── Create.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── node_modules/
```

## Como executar

1. Navegue para a pasta do projeto:
   ```
   cd cash-management
   ```

2. Instale as dependências (se necessário):
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Páginas Disponíveis

- `/` - Login
- `/dashboard` - Dashboard principal
- `/transactions` - Lista de transações
- `/types` - Tipos de transação
- `/create` - Criar nova transação

## Próximos Passos

Para converter os HTMLs originais:

1. Copie o conteúdo dos arquivos HTML do `In JavaScript/sticht`
2. Converta as classes Tailwind para classes Bootstrap
3. Substitua `class` por `className`
4. Importe os componentes do `react-bootstrap`
5. Adapte os modais e navegação

## Dependências

- React 19
- React Bootstrap
- React Router DOM
- Bootstrap 5

## Para levar offline

Copie toda a pasta `cash-management` incluindo `node_modules` para o local sem internet. Execute `npm start` lá.


frontend/
├── public/                # Arquivos estáticos (index.html, favicon)
└── src/
    ├── assets/            # Imagens, ícones globais, fontes
    ├── components/        # Componentes globais e reutilizáveis
    │   ├── common/        # Botões, inputs, loaders (UI básica)
    │   │   ├── Button/
    │   │   │   ├── Button.tsx
    │   │   │   └── Button.styles.ts
    │   │   └── Input/
    │   ├── layout/        # Header, Footer, Sidebar
    │   └── feedback/      # Modais, Alerts, Toasts
    ├── context/           # Contextos globais do React (ex: AuthContext)
    ├── hooks/             # Custom hooks globais (ex: useAuth, useFetch)
    ├── pages/             # Páginas da aplicação (roteamento)
    │   ├── Home/
    │   │   ├── components/# Componentes exclusivos desta página
    │   │   └── Home.tsx
    │   └── Login/
    ├── routes/            # Configuração das rotas (React Router)
    ├── services/          # Integração com o Back-end (Chamadas de API)
    │   ├── api.ts         # Configuração do Axios / Fetch Client
    │   └── authService.ts # Métodos específicos (login, logout)
    ├── styles/            # Configurações globais de CSS / Temas
    ├── utils/             # Funções utilitárias puras (validações, formatações)
    ├── App.tsx            # Componente raiz
    └── main.tsx           # Ponto de entrada do React
