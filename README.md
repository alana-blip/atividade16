# `apihello`

> Código fonte utilizado na Aula 16 da disciplina Programação Web 1

### Objetivo

- Utilizar o código fonte como exemplo de primeira implementação de API

### *End points*

| Método | Endpoint             | Descrição                                                                  |
|--------|----------------------|----------------------------------------------------------------------------|
| GET    | `/v1/hi`             | Exibe saída JSON com `out: "Hello, world!"`                                |
| GET    | `/v1/hi/user/{name}` | Exibe saída JSON com `out: "Hello, {name}"` para um usuário específico     |
| POST   | `/v1/hi`             | Exibe a saída JSON `out: "Hello, {name}"` para um usuário específico       |

### Instruções de uso

1. Clonar o projeto utilizando o comando `git clone https://github.com/pw1-repo/apihello.git`
2. Instalar as dependências com o comando `npm install`
3. Rodar a aplicação `node app`
4. Acessar cada *endpoint* e observar as respostas