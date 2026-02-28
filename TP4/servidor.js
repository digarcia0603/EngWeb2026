var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')
var static = require('./static.js')


// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


var examesServer = http.createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    

    if(static.staticResource(req)){
            static.serveStaticResource(req, res)
        }
        else{
            switch(req.method){
                case "GET": 
                    // GET /emd ------------------------------------------------------------------
                    
                    var partes = req.url.split('?')
                    var rota = partes[0]
                    var parametros = partes[1] ? '?' + partes[1] : ''

                    if(rota == '/' || rota == '/emd'){
                        axios.get("http://localhost:3000/emd" + parametros)
                        .then(resp => {
                            var exames = resp.data 
                            
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.examesListPage(exames, d))
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end("<p>Erro na listagem de registos: " + erro + "</p>")
                        })
                    }
                    
                    // GET /emd/registo - responde com o formulário para recolha dos dados do novo EMD;
                    else if(req.url == '/emd/registo'){
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.exameFormPage(d))
                    }

                    // GET /emd/editar/:id
                    else if(/\/emd\/editar\/[a-zA-Z0-9]+$/.test(req.url)){
                        var idEmd = req.url.split('/')[3]
                        
                        axios.get('http://localhost:3000/emd?id=' + idEmd)
                        .then(resp => {
                            var exame = resp.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.exameEditPage(exame, d)) 
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Erro na obtenção do registo para edição: " + erro, d))
                        })
                    }

                    // GET /emd/apagar/:id)
                    else if(/\/emd\/apagar\/[a-zA-Z0-9]+$/.test(req.url)){
                        var idEmd = req.url.split('/')[3]
                        
                        axios.delete('http://localhost:3000/emd/' + idEmd)
                        .then(resp => {
                            res.writeHead(303, {'Location': '/'})
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.errorPage("Erro ao apagar o registo: " + erro, d))
                        })
                    }

                    // GET /emd/:id --------------------------------------------------------------
                    else if(/\/emd\/[a-zA-Z0-9]+$/.test(req.url)){
                        var idEmd = req.url.split('/')[2]
                        axios.get('http://localhost:3000/emd?id=' + idEmd)
                        .then(resp => {
                            var exame = resp.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end(templates.examePage(exame, d))
                        })
                        .catch(erro => {
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end("<p>Erro na obtenção do registo: " + erro + "</p>")
                        })
                    }
                    
                    // GET ? -> Lancar um erro
                    else {
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(`Erro 404: A rota '${req.url}' não existe neste servidor.`, d))
                    }
                    break    
                    
                case "POST":
                    if(req.url == '/emd' || req.url == '/emd/registo'){
                        collectRequestBodyData(req, result => {
                            if(result){
                                
                                var novoExame = {
                                    nome: {
                                        primeiro: result.primeiro,
                                        último: result.último
                                    },
                                    idade: result.idade,
                                    género: result.género,
                                    morada: result.morada,
                                    dataEMD: result.dataEMD,
                                    modalidade: result.modalidade,
                                    clube: result.clube,
                                    email: result.email,
                                    federado: result.federado === 'true',
                                    resultado: result.resultado === 'true'
                                }
                                
                                axios.post('http://localhost:3000/emd', novoExame)
                                .then(resp => {
                                    res.writeHead(303, {'Location': '/'})
                                    res.end()
                                })
                                .catch(erro => {
                                    rres.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.errorPage("Erro ao inserir o registo: " + erro, d))
                                })
                            }
                            else{
                                res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                                res.write('<p>Não foi possível obter os dados do body...</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            }
                        })
                    }
                    else if (/\/emd\/[a-zA-Z0-9]+$/.test(req.url)) {
                        var idEmd = req.url.split('/')[2]

                        collectRequestBodyData(req, result => {
                            if (result) {
                                var exameEditado = {
                                    id: idEmd, 
                                    dataEMD: result.dataEMD,
                                    nome: {
                                        primeiro: result.primeiro,
                                        último: result.último
                                    },
                                    idade: result.idade,
                                    género: result.género,
                                    morada: result.morada,
                                    modalidade: result.modalidade,
                                    clube: result.clube,
                                    email: result.email,
                                    federado: result.federado === 'true',
                                    resultado: result.resultado === 'true'
                                }

                                axios.put('http://localhost:3000/emd/' + idEmd, exameEditado)
                                .then (resp => {
                                    res.writeHead(303, {'Location': '/'})
                                    res.end()
                                })
                                .catch(erro => {
                                    res.writeHead(503, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end(templates.errorPage("Erro ao editar o registo: " + erro, d))
                                })
                            }
                            else{
                                res.writeHead(502, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end(templates.errorPage("Erro: Falta de dados no body do POST", d))
                            }
                        })
                    }

                    else {
                        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.errorPage(`Erro 404: A rota '${req.url}' não existe neste servidor.`, d))
                    }
                    
                    break

                default: 
                    res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'})
                    res.end(templates.errorPage(`Erro 405: O método '${req.method}' não é suportado.`, d))
                    break
                    
            }
    }
})
    
examesServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})