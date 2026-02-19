# TPC3 : Servidor da Escola de Música

## Data: 13 de Fevereiro de 2026
## EngenhariaWeb2026

## Autor
* **Nome:** Diogo António Sousa Garcia Costa
* **ID:** A107328

![Foto do Autor](foto.png)

## Resumo
Este trabalho consistiu na criação de um servidor aplicacional em Node.js para gerir e visualizar informações de uma escola de música, utilizando um dataset em formato JSON (`db.json`).

O servidor foi desenvolvido seguindo a arquitetura aprendida nas aulas práticas, utilizando as seguintes tecnologias:
* **json-server**: Para simular uma API REST com os dados dos alunos, cursos e instrumentos.
* **Axios**: Para realizar os pedidos (GET) do servidor aplicacional para a API de dados.
* **W3.CSS**: Para a estilização das páginas HTML, garantindo uma interface limpa e organizada através de componentes como *cards* e tabelas estilizadas.

As rotas implementadas foram:
* `/`: Página principal com o menu de navegação.
* `/alunos`: Listagem de todos os alunos registados.
* `/cursos`: Listagem dos cursos e respetivos instrumentos associados.
* `/instrumentos`: Listagem de todos os instrumentos musicais disponíveis.

## Como Executar
1. Ligar o json-server: `json-server --watch dataset_reparacoes.json --port 3000`
2. Iniciar o servidor aplicacional: `node servidor_EscolaMusica.js`
3. Aceder a: `http://localhost:25000`

## Lista de Resultados
* [servidor_EscolaMusica.js](./servidor_EscolaMusica.js) - Código do servidor Node.js.
* [db.json](./db.json) - Dataset utilizado.