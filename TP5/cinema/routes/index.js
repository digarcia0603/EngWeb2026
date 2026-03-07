var express = require('express');
var router = express.Router();
var axios = require('axios');

/* a) GET / ou /filmes */
router.get(['/', '/filmes'], function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  
  axios.get("http://localhost:3000/filmes?_sort=year")
  .then(resp => {
      var filmes = resp.data
      res.render('filmes', { list: filmes, date: d });
  })
});

/* b) GET /filmes/:id */
router.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  
  axios.get("http://localhost:3000/filmes/" + req.params.id)
  .then(resp => {
      var filmes = resp.data 
      res.render('filme_detalhes', { filme: filmes, date: d });
  })
});

/* c) GET /atores */
router.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data
    var dicionarioAtores = {};

    filmes.forEach(f => {
      if (f.cast) {
        f.cast.forEach(ator => {
          if (!dicionarioAtores[ator]) {
            dicionarioAtores[ator] = 1;
          } else {
            dicionarioAtores[ator]++;
          }
        });
      }
    });

    var listaAtores = Object.keys(dicionarioAtores).map(ator => {
      return { nome: ator, numFilmes: dicionarioAtores[ator] };
    });

    listaAtores.sort((a, b) => a.nome.localeCompare(b.nome));

    res.render('atores', { list: listaAtores, date: d});

  })

})

/* d) GET /atores/:id */
router.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var nomeAtor = req.params.id;

  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data;

    var filmesDoAtor = filmes.filter(f => f.cast && f.cast.includes(nomeAtor));

    res.render('ator_detalhes', { ator: nomeAtor, filmes: filmesDoAtor, date: d});
  })
})

/* e) GET /genero */
router.get('/genero', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)

  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data
    var dicionarioGenero = {};

    filmes.forEach(f => {
      if (f.genres) {
        f.genres.forEach(genero => {
          if (!dicionarioGenero[genero]) {
            dicionarioGenero[genero] = 1;
          } else {
            dicionarioGenero[genero]++;
          }
        });
      }
    });

    var listaGeneros = Object.keys(dicionarioGenero).map(genero => {
      return { nome: genero, numFilmes: dicionarioGenero[genero] };
    });

    listaGeneros.sort((a, b) => a.nome.localeCompare(b.nome));

    res.render('generos', { list: listaGeneros, date: d});

  })

})

/* f) GET /genero/:id */
router.get('/genero/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  var nomeGenero = req.params.id;

  axios.get("http://localhost:3000/filmes")
  .then(resp => {
    var filmes = resp.data;

    var filmesGenero = filmes.filter(f => f.genres && f.genres.includes(nomeGenero));

    res.render('genero_detalhes', { genero: nomeGenero, filmes: filmesGenero, date: d});
  })
})

module.exports = router;
