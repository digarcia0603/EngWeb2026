const fs = require('fs');
const dataset = require('./cinema.json')

dataset.filmes.forEach((filme, index) => {
    filme.id = "f" + (index + 1);
});

fs.writeFileSync('cinema_fixed.json', JSON.stringify(dataset, null, 2));
console.log("Adicionado ids com sucesso! Ficheiro cinema_fized.json criado.");
