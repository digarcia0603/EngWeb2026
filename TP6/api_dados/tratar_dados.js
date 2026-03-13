const fs = require('fs');

const rawdata = fs.readFileSync('cinema.json');
const dados = JSON.parse(rawdata);

let filmes = [];
let atoresMap = {};
let generosMap = {};

let atorIdCounter = 1;
let generoIdCounter = 1;

dados.filmes.forEach((filme, index) => {
    filme._id = "f" + index;
    filmes.push(filme);

    filme.cast.forEach(ator => {
        if (!atoresMap[ator]) {
            atoresMap[ator] = {
                _id: "a" + atorIdCounter++,
                nome: ator,
                filmes: [] 
            };
        }

        atoresMap[ator].filmes.push({ id: filme._id, title: filme.title });
    });

    filme.genres.forEach(genero => {
        if (!generosMap[genero]) {
            generosMap[genero] = {
                _id: "g" + generoIdCounter++,
                designacao: genero,
                filmes: [] 
            };
        }

        generosMap[genero].filmes.push({ id: filme._id, title: filme.title });
    });
});

const atores = Object.values(atoresMap);
const generos = Object.values(generosMap);

fs.writeFileSync('filmes.json', JSON.stringify(filmes, null, 2));
fs.writeFileSync('atores.json', JSON.stringify(atores, null, 2));
fs.writeFileSync('generos.json', JSON.stringify(generos, null, 2));

console.log(`Sucesso! Foram gerados:`);
console.log(`- ${filmes.length} filmes`);
console.log(`- ${atores.length} atores`);
console.log(`- ${generos.length} géneros`);