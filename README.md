# Controlle CRUD API

Esse repositório contém o código fonte da API para controle de contatos e endereços.

## Antes de começar

### Pre requisitos

1. Git
2. Node: >= 12.x
3. Yarn ou Npm
4. PostgreSQL 

### Instalação

1. Para fazer uma cópia do projeto.

```bash
git clone https://github.com/victorhnogueira/controlle-api
```
2. Entre na pasta do clonada.
```bash
cd controlle-api
```
3. Crie um arquivo `.env` na raiz do projeto, e preencha com o numero da porta do servidor e com os dados de conexão com o  banco de dados.
```
#Sever port default: 3333
PORT=

#Database configuration
DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=

```
4. instale as dependencias
```bash
yarn install
```
5. Rode as migrations
```bash
yarn knex migrate:latest
```

### Iniciando a aplicação

Para iniciar o servidor em modo de desenvolvimento
```bash
yarn start:dev
```
Ou então, para criar uma versão otimizada para produção
```bash
yarn build
```
Para iniciar o servidor em modo de produção
```bash
yarn start
```

O servidor irá iniciar na porta configurada na variavel `PORT` do arquivo `.env`, se nenhum valor for informado, o servidor irá iniciar na porta 3333.

## Rotas
### Listar todos os contatos e endereços
method: GET

```bash
http://localhost:{PORT}
```

### Para cadastrar um novo contato e seu respectivo endereço
method: POST

```bash
http://localhost:{PORT}
```
body

```json
{
    "name": "nome",
    "email": "usuario@mail.com",
    "phone": "5518999999999",
    "type": "PJ",
    "cpf_cnpj": "00.123.123/0001-10",
    "address": {
        "zipcode": "19200-000",
        "street": "Rua das flores",
        "number": "15",
        "complement": "B",
        "district": "Centro",
        "city": "Sao Paulo",
        "state": "SP"
    }
}
```

### Para atualizar um cadastro e/ou seu endereço
method: PUT

```bash
http://localhost:{PORT}/{contactId}
```
body

```json
{
    "name": "nome",
    "email": "usuario@mail.com",
    "phone": "5518999999999",
    "type": "PJ",
    "cpf_cnpj": "00.123.123/0001-10",
    "address": {
        "zipcode": "19200-000",
        "street": "Rua das flores",
        "number": "15",
        "complement": "B",
        "district": "Centro",
        "city": "Sao Paulo",
        "state": "SP"
    }
}
```

### Para inativar um contato
method: DELETE

```bash
http://localhost:{PORT}/{contactId}
```


### Para ativar um contato
method: PUT

```bash
http://localhost:{PORT}/{contactId}/activate
```
