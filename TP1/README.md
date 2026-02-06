# TPC1 : Análise de um Dataset de Reparações

## Data: 5 de Fevereiro de 2026
## EngenhariaWeb2026

## Autor
* **Nome:** Diogo António Sousa Garcia Costa
* **ID:** A107328

![Foto do Autor](foto.png)

## Resumo
Este trabalho consistiu na criação de um script em Python para processar um dataset de reparações de uma oficina automóvel (`dataset_reparacoes.json`) e gerar um website para consulta desses dados.

O processamento foi dividido nas seguintes etapas:
1.  **Leitura do JSON:** Carregamento dos dados para memória.
2.  **Estrutura de ficheiros:** Criação automática da pasta `site_reparacoes`.
3.  **Geração do Índice:** Criação da página principal com links para as várias listagens.
4.  **Listagens Globais:**
    * Lista de todas as reparações (com data, NIF, cliente, viatura).
    * Lista de tipos de intervenção (agrupadas por código, ordenadas alfabeticamente).
    * Lista de viaturas (agrupadas por marca e modelo, com contagem de ocorrências).
5.  **Páginas Individuais:**
    * Detalhe de cada reparação.
    * Detalhe de cada tipo de intervenção (listando todas as reparações onde foi aplicada).
    * Detalhe de cada viatura (listando o histórico de reparações desse modelo).

## Lista de Resultados
* [tpc1.py](./tpc1.py) - O script Python desenvolvido.
* [dataset_reparacoes.json](./dataset_reparacoes.json) - O ficheiro de dados original.
* [site_reparacoes/](./site_reparacoes/) - Pasta de output contendo todo o website gerado.
* [site_reparacoes/index.html](./site_reparacoes/index.html) - A página principal do website gerado.
