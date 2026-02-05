import json, os, shutil

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)



# ------------- Página principal ----------------

dados_global = open_json("dataset_reparacoes.json")
lista_reparacoes = dados_global["reparacoes"]


index_html = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Gestão de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Oficina Automóvel - Dados Consultáveis</h1>
        <ul>
            <li><a href="lista_reparacoes.html">Listagem de Reparações</a></li>
            <li><a href="lista_intervencoes.html">Listagem por Tipos de Intervenção</a></li>
            <li><a href="lista_viaturas.html">Listagem por Marcas e Modelos</a></li>
        </ul>
    </body>
</html>
'''
mk_dir("site_reparacoes")
new_file("site_reparacoes/index.html", index_html)


# ----------------- Listagem das reparações ------------------

linhas_reparacoes = ""

for i, rep in enumerate(lista_reparacoes):
    linhas_reparacoes += f'''
    <tr>
        <td><a href="reparacao_{i}.html">{rep['data']}</a></td>
        <td>{rep['nif']}</td>
        <td>{rep['nome']}</td>
        <td>{rep['viatura']['marca']}</td>
        <td>{rep['viatura']['modelo']}</td>
        <td>{rep['nr_intervencoes']}</td>
    </tr>
    '''

html_reparacoes = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Listagem das Reparações</h2>
        <p><a href="index.html">Voltar ao Índice</a></p>
        <table border="1">
            <tr>
                <th>Data</th>
                <th>NIF</th>
                <th>Cliente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Nr. Intervenções</th>
            </tr>
            {linhas_reparacoes}
        </table>
    </body>
</html>
'''
new_file("site_reparacoes/lista_reparacoes.html", html_reparacoes)


# ---------------- Listagem de tipos de intervenções ----------------

dicionario_intervencoes = {}

for rep in lista_reparacoes:
    for intervencao in rep['intervencoes']:
        code = intervencao['codigo']
        if code not in dicionario_intervencoes:
            dicionario_intervencoes[code] = intervencao

codigos_ordenados = sorted(dicionario_intervencoes.keys())

linhas_intervencoes = ""
for code in codigos_ordenados:
    dados_int = dicionario_intervencoes[code]
    linhas_intervencoes += f'''
    <tr>
        <td><a href="intervencao_{code}.html">{dados_int['codigo']}</a></td>
        <td>{dados_int['nome']}</td>
        <td>{dados_int['descricao']}</td>
    </tr>
    '''

html_intervencoes = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Tipos de Intervenção</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Tipos de Intervenção</h2>
        <p><a href="index.html">Voltar ao Índice</a></p>
        <table border="1">
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
            {linhas_intervencoes}
        </table>
    </body>
</html>
'''
new_file("site_reparacoes/lista_intervencoes.html", html_intervencoes)


# --------------- Listagem de marcas e modelos -------------------

dicionario_carros = {} 

for rep in lista_reparacoes:
    chave = (rep['viatura']['marca'], rep['viatura']['modelo'])
    if chave not in dicionario_carros:
        dicionario_carros[chave] = 0
    dicionario_carros[chave] += 1

chaves_carros_ordenadas = sorted(dicionario_carros.keys())

linhas_carros = ""
for marca, modelo in chaves_carros_ordenadas:
    count = dicionario_carros[(marca, modelo)]

    filename_carro = f"viatura_{marca}_{modelo}.html".replace(" ", "_")
    
    linhas_carros += f'''
    <tr>
        <td>{marca}</td>
        <td><a href="{filename_carro}">{modelo}</a></td>
        <td>{count}</td>
    </tr>
    '''

html_carros = f'''
<!DOCTYPE html>
<html>
    <head>
        <title>Marcas e Modelos</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Viaturas intervencionadas</h2>
        <p><a href="index.html">Voltar ao Índice</a></p>
        <table border="1">
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Número de Carros</th>
            </tr>
            {linhas_carros}
        </table>
    </body>
</html>
'''
new_file("site_reparacoes/lista_viaturas.html", html_carros)


# -------------------- Páginas individuais: Reparação --------------------

for i, rep in enumerate(lista_reparacoes):
    itens_intervencao = ""
    for interv in rep['intervencoes']:
        itens_intervencao += f"<li><a href='intervencao_{interv['codigo']}.html'>{interv['codigo']}</a> - {interv['nome']}</li>"

    marca = rep['viatura']['marca']
    modelo = rep['viatura']['modelo']
    filename_viatura = f"viatura_{marca}_{modelo}.html".replace(" ", "_")
    
    pag_reparacao = f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title>Reparação {rep['nif']}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Detalhes da Reparação</h1>
            <p><a href="lista_reparacoes.html">Voltar à lista</a></p>
            <hr/>
            <p>Cliente: {rep['nome']} (NIF: {rep['nif']})</p>
            <p>Data: {rep['data']}</p>
            <p><strong>Viatura:</strong> <a href="{filename_viatura}">{marca} {modelo}</a> ({rep['viatura']['matricula']})</p>
            
            <h3>Intervenções Realizadas ({rep['nr_intervencoes']}):</h3>
            <ul>
                {itens_intervencao}
            </ul>
        </body>
    </html>
    '''
    new_file(f"site_reparacoes/reparacao_{i}.html", pag_reparacao)


# -------------- Páginas individuais: tipos de intervenção -------------------

for code in codigos_ordenados:
    dados_int = dicionario_intervencoes[code]
    
    reparacoes_com_este_cod = []
    for i, rep in enumerate(lista_reparacoes):
        for int_rep in rep['intervencoes']:
            if int_rep['codigo'] == code:
                reparacoes_com_este_cod.append( (i, rep) )
                break
    
    lista_links_rep = ""
    for idx, r in reparacoes_com_este_cod:
        lista_links_rep += f'''
        <li><a href="reparacao_{idx}.html">{r['data']} - {r['nome']} ({r['viatura']['marca']} {r['viatura']['modelo']})</a></li>
        '''

    pag_intervencao = f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title>Intervenção {code}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>{dados_int['codigo']} - {dados_int['nome']}</h1>
            <p><a href="lista_intervencoes.html">Voltar à lista de intervenções</a></p>
            <p>Descrição: {dados_int['descricao']}</p>
            <hr/>
            <h3>Foi realizada nas seguintes reparações:</h3>
            <ul>
                {lista_links_rep}
            </ul>
        </body>
    </html>
    '''
    new_file(f"site_reparacoes/intervencao_{code}.html", pag_intervencao)


# ------------ Páginas individuais: Marca/Modelo -------------------

for marca, modelo in chaves_carros_ordenadas:
    reparacoes_deste_carro = []
    for i, rep in enumerate(lista_reparacoes):
        if rep['viatura']['marca'] == marca and rep['viatura']['modelo'] == modelo:
            reparacoes_deste_carro.append( (i, rep) )

    lista_links_carro = ""
    for idx, r in reparacoes_deste_carro:
        lista_links_carro += f'''
        <li><a href="reparacao_{idx}.html">{r['data']} - {r['nome']} (Matrícula: {r['viatura']['matricula']})</a></li>
        '''
    
    filename = f"viatura_{marca}_{modelo}.html".replace(" ", "_")

    pag_carro = f'''
    <!DOCTYPE html>
    <html>
        <head>
            <title>{marca} {modelo}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>{marca} {modelo}</h1>
            <p><a href="lista_viaturas.html">Voltar à lista de viaturas</a></p>
            <hr/>
            <h3>Histórico de intervenções neste modelo:</h3>
            <ul>
                {lista_links_carro}
            </ul>
        </body>
    </html>
    '''
    new_file(f"site_reparacoes/{filename}", pag_carro)