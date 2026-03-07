# TPC5 : Aplicação Web para Gestão de Cinema com Express

## Data: 6 de Março de 2026
## EngenhariaWeb2026

## Autor
* **Nome:** Diogo António Sousa Garcia Costa
* **ID:** A107328

![Foto do Autor](foto.png)

## Resumo
Este trabalho consistiu na criação de uma aplicação Web estruturada usando a framework **Express** em **Node.js**. A aplicação consome uma API de dados e gera páginas HTML utilizando o motor de templates **Pug** e a framework de CSS **W3.CSS**.

O sistema está dividido em dois componentes principais:
1. Um **json-server** a correr na porta 3000, servindo os dados do ficheiro `cinema_fixed.json` (ao qual foram adicionados IDs únicos para cada filme).
2. **Servidor Web (Express):** A correr na porta 3007, faz pedidos HTTP ao json-server usando a biblioteca **axios** e processa os dados para renderizar as vistas.

As seguintes rotas e funcionalidades foram implementadas:
* **`/filmes`** (ou `/`): Lista todos os filmes disponíveis numa tabela, mostrando o ID, Título, Ano, e a contagem de Géneros e Atores (Cast).
* **`/filmes/:id`**: Apresenta a página de detalhes de um filme específico, incluindo a lista de atores e géneros (com links para as respetivas páginas).
* **`/atores`**: Lista agrupada de todos os atores presentes no dataset, ordenada alfabeticamente, e a contagem do número de filmes em que cada um participou.
* **`/atores/:id`**: Página individual de um ator, com a lista de todos os filmes em que o mesmo participou.
* **`/genero`** *(Funcionalidade Extra)*: Lista agrupada de todos os géneros cinematográficos e a contagem de filmes associados a cada um.
* **`/genero/:id`** *(Funcionalidade Extra)*: Página individual de um género, mostrando todos os filmes categorizados nesse género.

## Como Executar
1. Instalar as dependências do projeto: `npm install`
2. Ligar o json-server: `npx json-server --watch cinema_fixed.json`
3. Num novo terminal, ligar o servidor Express: `npm run start`
4. Aceder à aplicação no browser: `http://localhost:3007`

## Lista de Resultados
* [app.js](app.js) - Configuração principal da aplicação Express.
* [cinema/routes/index.js](routes/index.js) - Roteador principal contendo a lógica de tratamento de dados e pedidos axios.
* [cinema_fixed.json](cinema_fixed.json) - Dataset atualizado com os IDs gerados.
* [cinema/views/](views/) - Pasta contendo todos os templates Pug (`filmes.pug`, `filme_detalhes.pug`, `atores.pug`, `ator_detalhes.pug`, `generos.pug`, `genero_detalhes.pug`, `layout.pug`, `error.pug`).