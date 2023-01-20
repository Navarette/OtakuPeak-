from flask import Flask, render_template, send_file, make_response, url_for, Response, request, redirect, jsonify
import pandas as pd
import pymssql

from flask_cors import CORS

from os import getenv
from dotenv import load_dotenv

load_dotenv()

# pip install flask matplotlib pandas pymssql flask_cors python-dotenv
conn = pymssql.connect(server='213.140.22.237\SQLEXPRESS',
                       user='ghebrous.davide', password='xxx123##', database='ghebrous.davide')

app = Flask(__name__)
CORS(app)

@app.route('/')
def start():
    return render_template('start.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/Register',methods=['POST'])
def reg():
    username = request.args.get("username")
    email = request.args.get("email")
    # Il controllo della password e della sua conferma lo faccio fare ad Angular tramite la form
    password = request.args.get("pwd")
    # cpwd = request.args.get("cpwd")

    Cq = "SELECT * FROM utente WHERE username = %(username)s OR email = %(email)s"
    Ccursor = conn.cursor(as_dict=True)
    Cp = {"username": f"{username}","email": f"{email}"}
    Ccursor.execute(Cq, Cp)
    Cdata = Ccursor.fetchall()

    print(Cdata)

    if len(Cdata) < 1: # Se l'utente non esiste
        print(request.args)
        q = 'INSERT INTO utente (username, email, pwd) VALUES (%(username)s, %(email)s, %(password)s)'
        cursor = conn.cursor(as_dict=True)
        p = {"username": f"{username}","email": f"{email}","password": f"{password}"}

        cursor.execute(q, p)
        conn.commit()
        return jsonify({'data': 'Ok!', 'url': 'login'})
    else:
        return jsonify({'data': 'User already exists!', 'url': None})

# --------------------------------LOGIN----------------------------------------------------------

@app.route('/Login', methods=['POST'])
def login():
  # Prendo gli argomenti richiesti
  email = request.args.get('email')
  password = request.args.get('pwd')

  data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }

  # Controllo se nono stati passati tutti i parametri richiesti
  if None not in [email, password]:
    # Prendo le informazioni dell'utente
    q = 'SELECT * FROM utente WHERE email = %(e)s'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q, params={"e": email})
    res = cursor.fetchall()

    # Controllo se l'utente esiste
    if len(res) < 1:
      data["statusCode"] = 404
      data["errorMessage"] = "No user was found with that email"
    elif not (res[0]["pwd"] == password):
      data["statusCode"] = 403
      data["errorMessage"] = "Wrong password"
    else:
      data["data"] = res
  else:
    data['statusCode'] = 400
    data['errorMessage'] = "No email or password provided"
  
  return jsonify(data)

#---------------------------------------------------------------------------------------------------------------
# pagina contenente i tipi di ricerca che si vuole utilizzare per gli anime
@app.route('/tipoRicercaAnime')
def tipoRiceraAnime():
    return render_template('tipoRicercaAnime.html')

# ricerca tramite titolo anime
@app.route('/titoloAnime', methods=['GET'])
def titoloAnime():
    data = request.args.get("titoloa")
    print("il dato è" + str(data))
    q = 'SELECT * FROM anime ' + ('WHERE nome LIKE %(t)s' if data != None and data != '' else "")
    cursor = conn.cursor(as_dict=True)
    p = {"t": f"%{data}%"}
    cursor.execute(q, p)
    data = cursor.fetchall()

    return jsonify(data)

# ricerca tramite genere anime
@app.route('/genereAnime', methods=['GET'])
def genereAnime():
    global nome
    nome = request.args.get("scelta")
    q = 'SELECT * FROM genere order by nome'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()
    
    return jsonify(data)

# risultato anime
@app.route('/RisultatoAnime', methods=['GET'])
def risultatoAnime():
    params = request.args.get("scelta").split(",")
    prato = " AND ".join(['generi LIKE \'%'+p+'%\'' for p in params])
    q = 'SELECT * FROM anime WHERE ' + prato + ' ORDER BY nome'
    print(q)
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()
    print(data)
    return jsonify(data)

# specifica anime


@app.route('/SpecificaAnime', methods=['GET'])
def SpecificaAnime():

    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()
    print(data)
    return jsonify(data)


# pagina contenente i tipi di ricerca che si vuole utilizzare per i manga
@app.route('/tipoRicercaManga')
def tipoRiceraManga():
    return render_template('tipoRicercaManga.html')

# ricerca tramite titolo manga
@app.route('/titoloManga', methods=['GET'])
def titoloManga():
    data = request.args.get("titolom")

    print("il dato è" + str(data))

    q = 'SELECT * FROM manga ' + ('WHERE titolo LIKE %(t)s' if data != None and data != '' else "")
    cursor = conn.cursor(as_dict=True)
    p = {"t": f"%{data}%"}
    cursor.execute(q, p)
    data = cursor.fetchall()

    print(data)

    return jsonify(data)

# ricerca tramite genere manga
@app.route('/GenereManga', methods=['GET'])
def genereManga():
    nome = request.args.get("scelta")
    
    q = 'SELECT * FROM genere order by nome'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()

    return jsonify(data)

# risultato manga
@app.route('/RisultatoManga', methods=['GET'])
def risultatoManga():
    params = request.args.get("scelta").split(",")
    prato = " AND ".join(['generi LIKE \'%'+p+'%\'' for p in params])
    q = 'SELECT * FROM manga WHERE ' + prato + ' ORDER BY Rank'
    print(q)
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()
    print(data)
    return jsonify(data)





if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)
