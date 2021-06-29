# Controlle CRUD API

Esse repositório contém o código fonte da API para controle de contatos e endereços.

## Antes de começar

### Pre requisitos

1. Git
2. Node: >= 12.x
3. Yarn ou Npm
4. PostgreSQL 

### Instalação

Para fazer uma cópia do projeto.

```bash
> git clone https://github.com/victorhnogueira/controlle-api
```

### Rodando localmente

1. Entre na pasta do clonada.
```bash
> cd controlle-api
```
2. Crie um arquivo `.env` na raiz do projeto, e preencha com o numero da porta do servidor e com os dados de conexão com o  banco de dados.
```
#Sever port default: 3333
PORT=

#Database configuration
DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=

```

3. Inicie o servidor

Para iniciar o servidor em modo de desenvolvimento
```bash
> yarn start:dev
```
Ou então, para criar uma versão otimizada para produção
```bash
> yarn build
```
Para iniciar o servidor em modo de produção
```bash
> yarn start
```

O servidor irá iniciar na porta configurada na variavel `PORT` do arquivo `.env`, se nenhum valor for informado, o servidor irá iniciar na porta 3333.

## Rotas
