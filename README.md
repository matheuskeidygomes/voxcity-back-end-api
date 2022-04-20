# MyPharma API 

Esta api é utilizada para armazenamento e visualização de dados de usuários. Para seu desenvolvimento
foi utilizado Node.JS com Express.JS e MySQL.

![Node](https://img.shields.io/badge/Node-v16.14%20(LTS)-brightgreen)
![Npm](https://img.shields.io/badge/Npm-v8.3.1-blue) 
![License](https://img.shields.io/badge/License-MIT-red)

-------------------------------------------------------------------------------

<h2 align="center">
 <a href="#Status">Status</a> •
 <a href="#Features">Features</a> •
 <a href="#Pré-requisitos">Pré-requisitos</a> • 
 <a href="#Rodando-a-aplicação">Rodando a aplicação</a> • 
 <a href="#Testes">Testes</a> • 
 <a href="#Rotas">Rotas</a> • 
 <a href="#Tecnologias">Tecnologias</a> • 
 <a href="#Autor">Autor </a>
</h2>

--------------------------------------------------------------------------------

# Status

:heavy_check_mark: Finalizado

------------------------------------------------------------------------------

# Features

- [x] Cadastrar novos usuários.
- [x] Logar com usuário existente.
- [x] Visualizar informações de usuário cadastrado.
- [X] Gerar sequencial alfanumérico único a cada requisição de visualização de dados do usuário.



# Pré-requisitos

Será necessário ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). Também é 
aconselhável ter um editor para trabalhar com o código, como o [VSCode](https://code.visualstudio.com/).
O banco de dados desta aplicação se encontra na nuvem, porém se desejar roda-lo em sua máquina local, é aconselhável instalar o [MySQL](https://www.mongodb.com/try/download/community).

```bash

# Versão Node utilizada nesta aplicação: v16.14 (LTS)

```

# Rodando a aplicação

```bash

# Clone este repositório
$ git clone <https://github.com/matheuskeidygomes/mypharma-back-end-api.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd mypharma-back-end-api

# O banco de dados desta aplicação se encontra na nuvem, caso deseje rodar com banco local,  
# acesse o arquivo ".env" na raiz do projeto, e altere o valor da variável de ambiente "MONGO_URL" 
# para "mongodb://localhost:27017/mypharma".

# Instale as dependências
$ npm install

# Antes de executar a aplicação, caso esteja rodando com banco local, certifique se o 
# serviço do MongoDB se encontra ativo. 

# Execute a aplicação 
$ npm start

# O servidor iniciará na porta:3333 - acesse <http://localhost:3333>

```

------------------------------------------------------------------------------

# Testes

Para os testes da aplicação, foi utilizado Jest. Para rodar os testes, siga as seguintes instruções:

```bash

# Clone este repositório
$ git clone <https://github.com/matheuskeidygomes/mypharma-back-end-api.git>

# Acesse a pasta do projeto no terminal/cmd 
$ cd mypharma-back-end-api

# Instale as dependências
$ npm install

# Execute o comando
$ npm run test

# Aguarde a execução dos testes

```

# Rotas

## (Público) POST /register

Este endpoint é utilizado para realizar o processo de cadastro do usuário.

### PARÂMETROS

Nome, e-mail, experiência e senha do respectivo usuário.

Exemplo:

```bash

{
    "name" : "usuário teste",
    "email": "teste@gmail.com",
    "experience": "Programador"
    "password": "senhateste"
}

```

### RESPOSTAS

#### OK! 

Caso essa seja a resposta, você vai receber o token JWT para acessar endpoints protegidos da api.

Exemplo de resposta:

```bash

{
    "response": {
        "status": true,
        "name": "usuário teste",
        "email": "teste@gmail.com",
        "token": "eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0"
    }
}

```


----------------------------------------------------------------------------------------------

## (Público) POST /login

Este endpoint é utilizado para realizar o processo de login do usuário.

### PARÂMETROS

E-mail e senha do respectivo usuário cadastrado no sistema.

Exemplo:

```bash

{
    "email": "teste@gmail.com",
    "password": "senhateste"
}

```

### RESPOSTAS

#### OK! 

Caso essa seja a resposta, você vai receber o token JWT para acessar endpoints protegidos da api.

Exemplo de resposta:

```bash

{
    "response": {
        "status": true,
        "name": "usuário teste",
        "email": "teste@gmail.com",
        "token": "eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0"
    }
}

```

#### FALHA NA AUTENTICAÇÃO!

Caso essa seja a resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:

```bash

{
    "error": "E-mail and/or password incorrects! "
}

```


-------------------------------------------------------------------------------------------


## (Privado) POST /brand

Este endpoint é utilizado para realizar o processo de cadastro de marcas no banco de dados.

### PARÂMETROS

Nome da marca.

Exemplo:

```bash

{
    "name": "Marca Teste",
}

```

### RESPOSTAS

#### OK! 

Caso essa seja a resposta, você vai receber os dados da marca cadastrada.

Exemplo de resposta:

```bash

{
    "id": "62353327498deef01afbad10",
    "name": "Marca Teste"
}

```

#### FALHA NA AUTENTICAÇÃO!

Caso essa seja a resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Token inválido, expirado ou inexistente

Exemplo de resposta:

```bash

{
    "error": "Unauthorized!"
}

```

-----------------------------------------------------------------------------------------------


## (Privado) GET /brands

Este endpoint é utilizado para retornar a listagem de todos as marcas cadastradas no banco de dados.

### RESPOSTAS

#### OK!

Caso essa seja a resposta, você vai receber uma listagem das marcas cadastradas no banco de dados.

Exemplo de resposta:

```bash

{
    "list": [
        {
            "_id": "62350d9a4f73da1e8720ed4b",
            "UUID": "056d1ed6-61ce-4665-815e-5438ff6d8ac1",
            "name": "Medley",
            "__v": 0
        },
        {
            "_id": "62350da14f73da1e8720ed4e",
            "UUID": "9c0ccf9b-42bd-42fa-b889-3d61625e6ad9",
            "name": "Eurofarma",
            "__v": 0
        }
    ]
}

```

#### FALHA NA AUTENTICAÇÃO! 

Caso essa seja a resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Token inválido, expirado ou inexistente.

Exemplo de resposta:

```bash

{
    "error": "Unauthorized!"
}

```

-------------------------------------------------------------------------------------------------------

# Tecnologias 

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

-------------------------------------------------------------------------------------------------------

# Autor

Desenvolvido por <a href="https://github.com/matheuskeidygomes"> Matheus Keidy </a>. Entre em contato!  
  
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-keidy-7b9886190/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:matheuskeidygomes@gmail.com)











