const axios = require('axios')
const http = require('http')

http.createServer(function(req, res) {
    if(req.url == "/reparacoes"){
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html = `<table border = "1">
                            <tr>
                                <th>Nome</th>
                                <th>Nif</th>
                                <th>Data</th>
                                <th>Viatura
                                <th>Nr Intervencoes</th>
                            </tr>
                        `
                dados = resp.data;
                dados.forEach(a => {
                    html += `<tr>
                                <td>${a.nome}</td>
                                <td>${a.nif}</td>
                                <td>${a.data}</td>
                                <td>${a.viatura.marca} ${a.viatura.modelo}</td>
                                <td>${a.nr_intervencoes}</td>
                            </tr>
                    `
                });
                html += "</table>"
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(html)
            }).catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "</pre>")
            });
    } 
    else if (req.url == "/intervencoes"){
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html = `<table border = "1">
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Total Realizadas</th>
                            </tr>
                        `
                dados = resp.data;
                
                intervencoesVistas = {}

                dados.forEach(a => {
                    a.intervencoes.forEach(i => {
                        if (!intervencoesVistas[i.codigo]) {
                            intervencoesVistas[i.codigo] = {
                                "codigo": i.codigo,
                                "nome": i.nome,
                                "descricao": i.descricao,
                                "count": 0
                            }
                        }
                        intervencoesVistas[i.codigo].count++
                    })        
                });

                chavesOrdenadas = Object.keys(intervencoesVistas).sort()

                chavesOrdenadas.forEach(k => {
                    i = intervencoesVistas[k]
                    html += `
                            <tr>
                                <th>${i.codigo}</th>
                                <th>${i.nome}</th>
                                <th>${i.descricao}</th>
                                <th>${i.count}</th>
                            </tr> 
                        `
                })

                html += "</table>"
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(html)
            }).catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "</pre>")
            });
    } 
    else if (req.url == '/viaturas'){
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html = `<table border = "1">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Número de Reparações</th>
                            </tr> `
                dados = resp.data
                viaturasVistas = {}

                dados.forEach(a => {
                    chave = a.viatura.marca + "-" + a.viatura.modelo
                    if (!viaturasVistas[chave]) {
                        viaturasVistas[chave] = {
                            "marca": a.viatura.marca,
                            "modelo": a.viatura.modelo,
                            "count": 0
                        }
                    }
                    viaturasVistas[chave].count++
                })

                chavesOrdenadas = Object.keys(viaturasVistas).sort()

                chavesOrdenadas.forEach(k => {
                    v = viaturasVistas[k]
                    html += `
                            <tr>
                                <th>${v.marca}</th>
                                <th>${v.modelo}</th>
                                <th>${v.count}</th>
                            </tr> `
                })

                html += "</table>"
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(html)
            }).catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "</pre>")
            });
    } else {
        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>Pedido não suportado! Tente novamente...</p>")
    }

}).listen(7777)

console.log("Servidor de soma à escuta na porta 7777...")