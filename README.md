# Minhas Finanças - Aplicação Web e API

## Visão Geral

Este projeto consiste em uma aplicação web para controle de finanças de múltiplos usuários, com uma API REST correspondente. O usuário pode cadastrar, listar, atualizar e deletar movimentações financeiras, além de obter o saldo disponível com base nas transações cadastradas. Também é possivel se cadastrar, editar e excluir a conta como usuário.

## Tecnologias Utilizadas

### API

- Linguagem de programação: Java (versão 17).
- Framework: Spring Boot 3.1.1.
- Mapeamento relacional: Spring Data e Jakarta JPA.
- Banco de dados: PostgresSQL.
- Redução de código repetitivo: Lombok.

### Aplicação Web

- Linguagem de programação: Javascript com React.
- Gerenciamento de requisições: Axios.
- Gerenciamento de rotas: react-dom.

## Utilizando a Aplicação

**Antes de iniciar:**

1. Clone o repositório da [Minhas Finanças - Aplicação Web](https://github.com/drianodev/minhas-financas) e entre no diretório minhas-financas-api.

2. Certifique-se de ter o JDK 17 instalado.

3. Instale o IntelliJ IDE e importe o projeto Maven da API.

4. Instale o PostgresSQL.

5. Crie uma base de dados:

   ```shell
   psql -U postgres;
   ```

   ```sql
   CREATE DATABASE minhasfinancas;
   ```

   ```sql
   \c minhasfinancasapi;
   ```

   ```sql
   CREATE SCHEMA financas;
   ```

   **Observação:** O Spring Data fará o mapeamento das tabelas automaticamente.

**Executando a API:**

6. Execute o projeto Java.

**Executando a Aplicação Web:**

7. Entre no diretório minhas-financas.

8. Na raiz do projeto da aplicação web, execute os seguintes comandos:

   ```shell
   npm install
   ```

   ```shell
   npm run dev
   ```

9. A aplicação abrirá no navegador.

Agora, você pode usar a aplicação web para controlar suas finanças, consumindo a API correspondente.
