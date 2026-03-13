const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

const API_URL = process.env.API_URL || "http://localhost:7789/pubs";

app.get('/', (req, res) => {
    res.render('index', { data: new Date().toISOString().substring(0, 16) });
});

// filmes
app.get('/filmes', (req, res) => {
    axios.get(`${API_URL}/filmes`)
        .then(resp => res.render('filmes', { filmes: resp.data }))
        .catch(err => res.render('error', { error: err }));
});

app.get('/filmes/:id', (req, res) => {
    axios.get(`${API_URL}/filmes/${req.params.id}`)
        .then(resp => res.render('filme', { filme: resp.data }))
        .catch(err => res.render('error', { error: err }));
});

// atores
app.get('/atores', (req, res) => {
    axios.get(`${API_URL}/atores`)
        .then(resp => res.render('atores', { atores: resp.data }))
        .catch(err => res.render('error', { error: err }));
});

app.get('/atores/:id', (req, res) => {
    axios.get(`${API_URL}/atores/${req.params.id}`)
        .then(resp => res.render('ator', { ator: resp.data }))
        .catch(err => res.render('error', { error: err }));
});

// géneros
app.get('/generos', (req, res) => {
    axios.get(`${API_URL}/generos`)
        .then(resp => res.render('generos', { generos: resp.data }))
        .catch(err => res.render('error', { error: err }));
});

const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Interface do Cinema a correr na porta ${PORT}`);
});