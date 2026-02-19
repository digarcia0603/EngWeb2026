const axios = require('axios')
const http = require('http')

function pagina(titulo, corpo){
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>${titulo}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
    </head>
    <body class="w3-light-grey">

        <div class="w3-container w3-teal">
            <h1>${titulo}</h1>
        </div>

        <div class="w3-container w3-margin-top">
            ${corpo}
        </div>

    </body>
    </html>
    `
}

function geraTabela(cabecalho, linhas) {
    return `
    <table class="w3-table-all w3-hoverable">
        <thead>
            <tr class="w3-light-grey">
                ${cabecalho.map(c => `<th>${c}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${linhas.join('')}
        </tbody>
    </table>
    `
}

function link(href, texto){
    return `<a href="${href}">${texto}</a>`
}

function card(titulo, conteudo){
    return `
    <div class="w3-card-4 w3-white w3-margin-bottom">
        <header class="w3-container w3-teal">
            <h3>${titulo}</h3>
        </header>
        <div class="w3-container w3-padding">
            ${conteudo}
        </div>
    </div>
    `
}

function lista(items){
    if(items.length === 0)
        return `<p><i>Sem registos.</i></p>`

    return `
      <ul class="w3-ul w3-hoverable">
        ${items.map(i => `<li>${i}</li>`).join("")}
      </ul>
    `
}

function botaoVoltar(){
    return `<a class="w3-button w3-teal w3-margin-top" href="/">Voltar</a>`
}

// --------------------------------------------------------------------------------------

var myServer = http.createServer(async function (req,res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    switch(req.method){
        case "GET":
            if(req.url == "/"){
                try{
                    var corpo = lista([
                        link("/alunos", "Lista de Alunos"),
                        link("/cursos", "Lista de Cursos"),
                        link("/instrumentos", "Lista de Instrumentos")
                    ])
                    
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(pagina("Escola de Música", card("Menu de Opções", corpo)))
                }
                catch(error){
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro ao carregar as edições: ${error}</p>`)
                }
            }
            else if(req.url == "/alunos"){
                axios.get('http://localhost:3000/alunos')
                    .then(resp => {
                        var linhas = resp.data.map(a => `
                            <tr>
                                <td>${a.id}</td>
                                <td>${a.nome}</td>
                                <td>${a.dataNasc}</td>
                                <td>${a.curso}</td>
                                <td>${a.anoCurso}</td>
                                <td>${a.instrumento}</td>
                            </tr>`)
                        var corpo = geraTabela(["ID", "Nome", "Data de Nascimento", "Curso", "Ano do Curso", "Instrumento"], linhas)
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(pagina("Alunos", card("Registos de Alunos", corpo) + botaoVoltar()))
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end((pagina("Erro", `<p>${err}</p>`)) + botaoVoltar())
                    })
            } else if(req.url == "/cursos"){
                axios.get('http://localhost:3000/cursos')
                    .then(resp => {
                        var linhas = resp.data.map(c => `
                            <tr>
                                <td>${c.id}</td>
                                <td>${c.designacao}</td>
                                <td>${c.duracao}</td>
                                <td>${c.instrumento["#text"]}</td>
                            </tr>`)
                        var corpo = geraTabela(["ID", "Designação", "Duração", "Instrumento"], linhas)
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(pagina("Cursos", card("Lista de Cursos Oferecidos", corpo) + botaoVoltar()))
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(pagina("Erro", `<p>${err}</p>`))
                    })
            } else if(req.url == "/instrumentos"){
                axios.get('http://localhost:3000/instrumentos')
                    .then(resp => {
                        var linhas = resp.data.map(i => `
                            <tr>
                                <td>${i.id}</td>
                                <td>${i["#text"]}</td>
                            </tr>`)
                        var corpo = geraTabela(["ID", "Nome do Instrumento"], linhas)
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(pagina("Instrumentos", card("Lista de Instrumentos", corpo) + botaoVoltar()))
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(pagina("Erro", `<p>${err}</p>`))
                    })
            } else {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(pagina("Erro 404", "<p>Rota não suportada.</p>"))
            }
            break
        
        default:
            res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(`<p>Método não suportado: ${req.method}.</p>`)
    }
})

myServer.listen(25000)

console.log("Servidor à escuta na porta 25000")
