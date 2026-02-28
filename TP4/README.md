# TPC4 : Gestão de Exames Médicos Desportivos (EMD)

## Data: 26 de Fevereiro de 2026
## EngenhariaWeb2026

## Autor
* **Nome:** Diogo António Sousa Garcia Costa
* **ID:** A107328

![Foto do Autor](foto.png)

## Resumo
Este trabalho consistiu na criação de uma aplicação Web baseada num servidor **Node.js** que interage com uma API REST através do **json-server**. O objetivo principal é gerir uma base de dados de exames médicos desportivos de vários atletas. A interface gráfica foi construída utilizando o motor de templates **PUG** e estilizada com a framework **W3.CSS** .

## Funcionalidades Implementadas
A aplicação cumpre todos os requisitos do enunciado, permitindo as seguintes operações:
* `GET /` ou `GET /emd`: Apresenta uma tabela com todos os exames médicos (Nome, Data, Modalidade, Resultado).
* Linhas da tabela clicáveis para aceder facilmente aos detalhes.
* **[Funcionalidade Extra]** Botões de ordenação no topo da tabela para organizar os registos por Nome (crescente) ou Data (decrescente).
* `GET /emd/:id`: Mostra um "card" com todos os detalhes do atleta e do seu respetivo exame.
* `GET /emd/registo`: Apresenta o formulário de criação de um novo registo.
* `POST /emd`: Apanha os dados do formulário, constrói o objeto JSON e insere-o na base de dados, redirecionando para a página principal.
* `GET /emd/editar/:id`: Apresenta um formulário pré-preenchido com os dados atuais do exame.
* `POST /emd/:id`: Recolhe as alterações e atualiza o registo específico no `json-server`, redirecionando para a tabela principal.
* `GET /emd/apagar/:id`: Elimina o registo selecionado e redireciona imediatamente para a tabela principal.

> **Nota Técnica:** O dataset original `emd.json` foi alterado para que possa ser implementado estas funcionalidades.



## Como Executar
1. Ligar o json-server: `json-server --watch emd.json 3000`
2. Iniciar o servidor aplicacional: `node servidor.js`
3. Aceder a: `http://localhost:7777`

## Lista de Resultados
* [servidor.js](./servidor.js) - Código do servidor Node.js.
* [emd.json](./emd.json) - Dataset utilizado.
* [static.js](./static.js) - Módulo auxiliar que ajuda o Node.js a servir ficheiros estáticos (como o CSS e imagens).
* [templates.js](./templates.js) - Módulo que liga o servidor aos ficheiros HTML/PUG, contendo as funções que geram as páginas.
* [public/](./public/) - Pasta que contém os recursos estáticos da aplicação, nomeadamente a framework de CSS (`w3.css`) utilizada para estilizar as tabelas e formulários de forma automática.
* [views/](./views/) - Pasta que contém todos os ficheiros de templates em PUG, responsáveis por renderizar o HTML dinamicamente.


