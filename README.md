## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node](https://nodejs.org/en/)
- [Nestjs](https://nestjs.com)
- [Postgres](https://www.postgresql.org)
- [Prisma](https://www.prisma.io)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Brunoocn/tokenizadora-case-back.git
$ cd tokenizadora-case-back
```

Para iniciá-lo, siga os passos abaixo:

```bash
# subir o banco com o docker
$ docker-compose up -d
# Instalar as dependências
$ yarn install
# Iniciar o projeto
$ yarn start:dev
```

O server irá subir na porta http://localhost:3005.

Vale lembrar que você deve configurar .env como o .env.exemple

## ⚡️ Projeto

- A ideia do projeto foi separar a arquitetura em controllers, services e repositories, utilizando uma arquitetura escalavel e de
  forma simples de acordo com a necessidade de projeto, adicionei testes nas partes essenciais do sistema, porém seria possivel
  testar mais (se tivesse mais tempo com certeza era algo que eu focaria).
- Caso tivesse mais tempo que eu faria seria utilizar websocket que seria o melhor jeito para fazer a conexão do front-end com
  o backend.
- Outra coisa que faria seria melhorar as tratativas de erros para as respostas da api da crypto-compare e adicionar uma páginação
  principalmente na listagem de todas as cryptos, por conta de a api não trazer isso para nós e acaba trazendo gargalos.
