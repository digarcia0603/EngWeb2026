# TPC6 : Orquestração de Serviços (API e Interface) em Docker para Gestão de Cinema

## Data: 13 de Março de 2026
## EngenhariaWeb2026

## Autor
* **Nome:** Diogo António Sousa Garcia Costa
* **ID:** A107328

![Foto do Autor](foto.png)

## Resumo
Este trabalho consistiu na criação de uma arquitetura de serviços orquestrada em **Docker** para uma aplicação Web de Gestão de Cinema. A aplicação está dividida em serviços isolados que comunicam entre si através de uma rede interna do Docker.

O sistema é composto por três contentores principais:
1. **MongoDB (`mongodb_cinema`):** Base de dados inicializada automaticamente com o dataset original (`cinema.json`) dividido em três coleções distintas (`filmes`, `atores` e `generos`) através de um script de pré-processamento (`tratar_dados.js`).
2. **API de Dados (`api_cinema`):** Servidor construído em **Node.js/Express** com **Mongoose**, a correr na porta 7789, que expõe os dados das três coleções através de rotas GET (com suporte para pesquisa, ordenação e projeção).
3. **Servidor de Interface (`interface_cinema`):** Servidor aplicacional em **Express**, a correr na porta 7790. Consome a API de Dados através da biblioteca **axios** e gera páginas HTML dinâmicas utilizando o motor de templates **Pug** e a framework **W3.CSS**.

As seguintes rotas e funcionalidades foram implementadas na Interface Web:
* **`/`**: Página inicial com o menu de navegação principal.
* **`/filmes`**: Lista todos os filmes disponíveis numa tabela, mostrando o ID, Título, Ano, e a contagem de Géneros e Atores no elenco.
* **`/filmes/:id`**: Apresenta a página de detalhes de um filme específico, incluindo a lista de atores e géneros.
* **`/atores`**: Lista de todos os atores e a contagem do número de filmes em que cada um participou.
* **`/atores/:id`**: Página individual de um ator, com a lista de todos os filmes em que o mesmo participou.
* **`/generos`**: Lista de todos os géneros cinematográficos e a contagem de filmes associados a cada um.

## Como Executar
1. Garantir que o **Docker Desktop** (ou motor Docker) está em execução na máquina.
2. Abrir um terminal na raiz do projeto (onde se encontra o ficheiro `docker-compose.yml`).
3. Lançar a orquestração de serviços com o comando: 
   `docker compose up -d --build`
4. Aceder à Aplicação Web no browser: `http://localhost:7790`


## Lista de Resultados
* [docker-compose.yml](docker-compose.yml) - Ficheiro de orquestração que interliga o MongoDB, a API e a Interface numa rede virtual.
* [api_dados/](api_dados/) - Pasta contendo a API de Dados (Express), o script de tratamento de dados (`tratar_dados.js`), os scripts de importação do MongoDB e os respetivos Dockerfiles.
* [interface/](interface/) - Pasta contendo o Servidor Web de Interface, as vistas em Pug (`views/`) e o respetivo Dockerfile.