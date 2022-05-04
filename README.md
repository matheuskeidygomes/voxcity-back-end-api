# Voxcity API

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
O banco de dados desta aplicação se encontra na nuvem, porém se desejar roda-lo em sua máquina local, é aconselhável instalar o [MySQL](https://dev.mysql.com/downloads/mysql/) e um Gerenciador de banco de dados, como o [DBeaver](https://dbeaver.io/download/).

```bash

# Versão Node utilizada nesta aplicação: v16.14 (LTS)

```

# Rodando a aplicação

```bash

# Clone este repositório
$ git clone <https://github.com/matheuskeidygomes/voxcity-back-end-api.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd voxcity-back-end-api

# O banco de dados desta aplicação se encontra na nuvem, caso deseje rodar com banco local,  
# crie um arquivo ".env" na raiz do projeto, e insira as variáveis de ambiente responsáveis 
# pela conexão com o banco de dados local: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD e MYSQL_PORT.

# Instale as dependências
$ npm install

# Antes de executar a aplicação, caso esteja rodando com banco local, verifique se o serviço do MySQL se encontra
# ativo, e certifique-se de realizar o backup do arquivo sql presente na raiz do projeto, pois o mesmo é responsável 
# pela criação do banco de dados utilizado na aplicação.  

# Execute a aplicação 
$ npm start

# O servidor iniciará na porta:3333 - acesse <http://localhost:3333>

```

------------------------------------------------------------------------------

# Rotas

## (Público) POST /register

Este endpoint é utilizado para realizar o processo de cadastro do usuário.

### PARÂMETROS

Nome, e-mail, experiência, telefone e senha do respectivo usuário.

Exemplo:

```bash

{
    "name" : "usuário teste",
    "email": "teste@gmail.com",
    "experience": "Programador",
    "password": "senhateste",
    "phone": "21999999999"
}

```

### RESPOSTAS

#### OK! 

Caso essa seja a resposta, você vai receber o token JWT para acessar endpoints protegidos da api.

Exemplo de resposta:

```bash

{
    "id": 8,
    "name": "usuário teste",
    "email": "teste@gmail.com",
    "experience": "Programador",
    "phone": "21999999999",
    "token": "eyJhbGciOiJIUzIdsiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0ODQzNDMsImV4cCI6MTY1MDQ4NjE0M30.ldsa0pLCDmiCsuFEfYdr3XSmQzIH1ipGTa1DTolNlM4",
    "refreshToken": "eyJhbGciOiJIUzIdsiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0ODQzNDMsImV4cCI6MTY1MDQ4NjE0M30.ldsa0pLCDmiCsuFEfYdr3XSmQzIH1ipGTa1DTDSAD41d"
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
    "id": 8,
    "name": "usuário teste",
    "email": "teste@gmail.com",
    "experience": "Programador",
    "phone": "21999999999",
    "token": "eyJhbGciOiJIdsaI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0ODQzODksImV4cCI6MTY1MDQ5MTU4OX0.--5leV46x1TilkhtRXDqcJAhXbqZBAXJywvqKkmG58A",
    "refreshToken": "eyJhbGciOiJIUzIdsiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0ODQzNDMsImV4cCI6MTY1MDQ4NjE0M30.ldsa0pLCDmiCsuFEfYdr3XSmQzIH1ipGTa1DTDSAD41d"
}

```

#### FALHA NA AUTENTICAÇÃO!

Caso essa seja a resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de resposta:

```bash

{
    "error": "E-mail e/ou senha incorretos! "
}

```


-------------------------------------------------------------------------------------------


## (Privado) POST /refresh

Este endpoint é utilizado para realizar o processo de revalidação do token de usuário.

### PARÂMETROS

Refresh Token do respectivo usuário com sessão expirada.

Exemplo:

```bash

{
    "refreshToken": "eyJhbGciOiJIUzIdsiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0ODQzNDMsImV4cCI6MTY1MDQ4NjE0M30.ldsa0pLCDmiCsuFEfYdr3XSmQzIH1ipGTa1DTDSAD41d"
}

```

### RESPOSTAS

#### OK! 

Caso essa seja a resposta, você vai receber um novo access Token para acessar endpoints protegidos da api.

Exemplo de resposta:

```bash

{
    "id": 8,
    "token": "eyJhbGciOiJIdsaI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJpYXQiOjE2NTA0ODQzODksImV4cCI6MTY1MDQ5MTU4OX0.--5leV46x1TilkhtRXDqcJAhXbqZBAXJywvqKkmG58A",
}

```

#### FALHA NA AUTENTICAÇÃO!

Caso essa seja a resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Token Inválido ou inexistente.

Exemplo de resposta:

```bash

{
    "error": "Não autorizado! "
}

```


-------------------------------------------------------------------------------------------



## (Privado) GET /users/:id

Este endpoint é utilizado para visualizar dados do seu usuário cadastrado no banco de dados.

### PARÂMETROS

Na url deve ser enviado como parâmetro o id do seu usuário no banco de dados. Também deve ser enviado seu Token JWT com type "Bearer" no campo Authorization do header.

### RESPOSTAS

#### OK! 

Caso essa seja a resposta, você vai receber os dados do seu usuário cadastrado.

Exemplo de resposta:

```bash

{
    "id": 8,
    "name": "usuário teste",
    "email": "teste@gmail.com",
    "experience": "Programador",
    "phone": "21999999999"
}

```

#### FALHA NA AUTENTICAÇÃO!

Caso essa seja a resposta, significa que ocorreu uma falha durante o processo de autenticação da requisição. Motivos: Token inválido, expirado ou inexistente

Exemplo de resposta:

```bash

{
    "error": "Não autorizado!"
}

```

#### USUÁRIO INVÁLIDO!

Caso essa seja a resposta, significa que o id inserido na url como parâmetro, não coincide com o id do seu usuário logado. 

Exemplo de resposta:

```bash

{
    "error": "Este ID de usuário não pertence a sua conta. Por favor, insira o ID correto.!"
}

```

-------------------------------------------------------------------------------------------------------

# Tecnologias 

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

-------------------------------------------------------------------------------------------------------

# Autor

Desenvolvido por <a href="https://github.com/matheuskeidygomes"> Matheus Keidy </a>. Entre em contato!  
  
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-keidy-7b9886190/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:matheuskeidygomes@gmail.com)











