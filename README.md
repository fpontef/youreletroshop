# YourEletroShop

## Projeto de loja online usada como aprendizado do curso Ecommerce MERN com Brad Traversy

- Este projeto necessita do NodeJS, NPM e MongoDB.

## Estrutura inicial

```console
youreletroshop/
├── backend
│   ├── config
│   ├── controllers
│   ├── data
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── seeder.js
│   ├── server.js
│   └── utils
├── frontend
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── README.md
│   └── src
├── node_modules
├── package.json
├── Procfile
└── README.md
```

* Obs: Embora em pasta separada, as dependencias do backend estão na pasta raiz 'youreletroshop/node_modules'. As dependências do frontend estão na pasta frontend mesmo.

## Instalação:

- Download via github:
```console
  git clone URL_DO_PROJETO.git
```

- Configuração:
  Copiar ou renomear arquivo .env.sample para .env dentro da pasta 'youreletroshop'

- Instalação das dependências:
  Na pasta 'youreletroshop'

```console
npm install
```

Na pasta 'youreletroshop/frontend'

```console
npm install
```

- Executando o projeto Frontend e Backend:
  Na pasta 'youreletroshop'

- Comandos disponíveis:

* Roda somente o backend da aplicação (e banco de dados mongodb)

```console
npm run server
```

- Roda somente o client front-end da aplicação.

```console
npm run client
```

- Roda o sistema em modo desenvolvimento (backend e frontend)

```console
npm run dev
```

- Importa para o banco de dados um cadastro inicial

```console
npm run data:import
```

- Apaga do banco de ados as informações

```console
npm run data:delete
```

### FrontEnd

ReactJS via create-react-app como base;
Axios na comunicação HTTP do cliente / servidor;
Redux + Thunk;
Uso de reactHooks até no redux;
React Router para rotas;
UI com react-boostrap + react-router-boostrap;
Autenticação JWT e armazenamento no localstorage.

### Backend

NodeJS com ExpressJS para rotas;
Autenticação JWT via pacote jsonwebtoken;
Rotas autenticadas com diferentes permissões de acesso para Administrativo e Usuário autenticado.
'dotenv' para configurações de ambiente;

### API

Documentação Provisória da API usando Postman:
https://documenter.getpostman.com/view/16150471/TzY7dZAC

### Banco de Dados:

MongoDB via Mongoose.
Faz uso de Middleware do Mongoose: Schema.pre('save') para aplicar a criptografia hash na senha do usuário.
Faz uso de métodos para comparar senhas usando o bcrypt.

### Dev Dependecies:

Usando concurrently para rodar o servidor e cliente (backend e frontend;
Nodemon para reiniciar o servidor após realizar as mudanças;

### Mudanças implementadas no projeto original:

- Inclusão de um middleware 'asyncHandler' ao invés do uso de biblioteca de terceiros ('express-async-handler' e outras). Para tratamento de exceções dentro de funções async nas rotas do Express.

- Funções para exibição de Moeda local no frontend (localização).

- Correções de erros (saindo do login não limpava informação do login anterior)

## TODO:

- Falta remover item do estoque ao fechar a compra. Ex: 10 itens, compra 2 não ficam 8, continuam os 10.

- Testes frontend e backend.

- Melhorar texto das mensagens de erro no frontend.

- Retirar JWT do localstorage e passar para http-cookies.

- Paypal Sandbox (para desenvolvimento) não reconheceu BRL, somente as compras em USD.

- Fazer um cálculo dos itens do carrinho no backend p/ evitar que o usuário modifique o localstorage, incluindo o valor total.

- Melhorar UI com visual mais original.

- Usar Typescript.
