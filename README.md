# Web Service com Node utilizando banco de dados POSTGRES
Por:<br> 
  [Ruan Azevedo](https://www.linkedin.com/in/ruan-azevedo-904203151) <br>
  [Yagho Petini](https://www.linkedin.com/in/yagho-petini-9a73b9223)
## Sobre o projeto

Este é um projeto desenvolvido para a matéria de engenharia de software do 3º período do curso de Ciência da Computação na UTFPR campus Campo-Mourão.

Este projeto é um sistema para gerenciar a reserva de salas em uma biblioteca universitária. Ele permite que usuários realizem reservas, consultem disponibilidade e administrem salas de forma eficiente.

## Modelo conceitual
![Controle_sala_estudos](https://github.com/user-attachments/assets/54565f68-9bcc-4649-a043-dda8d83ed01b)

## Tecnologias utilizadas
- Linguagem: TypeScript
- Back-end: Node.js com Express
- Banco de Dados: PostgreSQL
- ORM: Prisma
- Arquitetura utilizada: MVC
- Padrão de projeto implementado: Mediator (Exemplo no routes e os controllers que possuem apenas uma instância dos serviços). Também foi utilizado o padrão Singleton para resolver alguns problemas.
  
## Funcionalidades do projeto
- CRUD de salas.
- CRUD de reservas.
- CRUD de usuários.
- CRUD de Admins.
- CRUD de horários.
- Autenticação de admins.
- Realizar uma reserva.
- Cancelar uma reserva.
- Autenticação de usuários.


## Como executar o projeto
Pré-requisitos: Node.js v18.19, Yarn v1.22 e Npm v9.2

[Instale o banco de dados PostgresSQL](https://www.postgresql.org/download/) na sua máquina e dentro dele,
crie um banco de dados com o nome sala_de_estudos

## clonar repositório
$ git clone https:git@github.com:zYagho/study-space-manager-.git

## entrar na pasta do projeto
$ cd study-space-manager-


# Como executar o BACK-END

## entrar na pasta do projeto
$ cd backend

crie um arquivo chamado .env na raiz do projeto (back-end) e adicione a ele as variaveis que estão no arquivo copia.env, substituindo as informações da variável DATABASE_URL pelas as que foram criadas no passo anterior de criar o banco de dados, altere apenas o usuário, se for necessário, e a sua senha.

## instale as dependências
$ npm install <br>
$ npm run dev

## executar o projeto
Digite o seguinte comando no terminal: yarn dev

Recomendo fazer as requisições utilizando a ferramenta [insomnia.](https://insomnia.rest/download)

Alguns exemplos de *endpoints*:
- http://localhost:3333/users
- http://localhost:3333/room
- http://localhost:3333/reserveroomtime
