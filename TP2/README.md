# TPC2 : Servidor Node.js para gestão de reparações

## Data: 13 de Fevereiro de 2026
## EngenhariaWeb2026

## Autor
* **Nome:** Diogo António Sousa Garcia Costa
* **ID:** A107328

![Foto do Autor](foto.png)

## Resumo
Este trabalho consistiu na criação de um servidor em **Node.js** que consome uma API de dados (json-server) e gera páginas HTML.

Está dividido em dois componentes:
1. Um `json-server` a correr na porta 3000, servindo o ficheiro `dataset_reparacoes.json`.
2. **Servidor Aplicacional:** Um script em Node.js (`servidor_reparacoes.js`) a correr na porta 7777, que faz pedidos ao json-server usando **axios** e processa os dados para gerar as páginas.

Funcionalidades implementadas:
* **`/reparacoes`**: Lista todas as reparações com NIF, Data, Nome e Viatura.
* **`/intervencoes`**: Lista os tipos de intervenção únicos e conta quantas vezes cada uma foi realizada.
* **`/viaturas`**: Lista as marcas e modelos únicos intervencionados e conta a quantidade de reparações por modelo.

## Como Executar
1. Ligar o json-server: `json-server --watch dataset_reparacoes.json --port 3000`
2. Ligar o servidor: `node servidor_reparacoes.js`
3. Aceder a: `http://localhost:7777`

## Lista de Resultados
* [servidor_reparacoes.js](./servidor_reparacoes.js) - Código do servidor Node.js.
* [dataset_reparacoes.json](./dataset_reparacoes.json) - Dataset utilizado.