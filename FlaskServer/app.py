from flask import Flask, render_template, send_file, make_response, url_for, Response, request, redirect, jsonify
import pandas as pd
import pymssql
import json

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


@app.route('/Register', methods=['POST'])
def reg():
    username = request.args.get("username")
    email = request.args.get("email")
    # Il controllo della password e della sua conferma lo faccio fare ad Angular tramite la form
    password = request.args.get("pwd")
    # cpwd = request.args.get("cpwd")
    data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
     }
    Cq = "SELECT * FROM utente WHERE username = %(username)s OR email = %(email)s"
    Ccursor = conn.cursor(as_dict=True)
    Cp = {"username": f"{username}","email": f"{email}"}
    Ccursor.execute(Cq, Cp)
    Cdata = Ccursor.fetchall()

    print(Cdata)

    if len(Cdata) < 1: # Se l'utente non esiste
        print(request.args)
        cursor = conn.cursor(as_dict=True)
        q = 'INSERT INTO utente (username, email, pwd,administrator) VALUES (%(username)s, %(email)s, %(password)s,0)'
        p = {"username": f"{username}","email": f"{email}","password": f"{password}"}
        cursor.execute(q, p)
        conn.commit()

        q = 'SELECT * FROM utente WHERE email = %(email)s'
        p = {"email": f"{email}"}
        cursor.execute(q, p)
        res = cursor.fetchall()
        data["data"] = res[0]
        return jsonify(data)
    else:
        return jsonify({'errorMessage': 'User already exists!', 'statusCode': 401})
# --------------------------------GENERI-UTENTE--------------------------------------------------
@app.route('/saveprefs',methods=['POST'])
def g_reg():
    id = request.args.get("id") # ID dell'utente
    generi = request.args.get("generi")
    data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }
    cursor = conn.cursor(as_dict=True)
    if generi != None and id != None:
        generi = json.loads(generi)
        print(generi)

        for e in generi:
            print(e)
            q = 'INSERT INTO user_genere (id_utente, id_genere) VALUES (%(id)s, %(g)s)'
            p = {'id': id, 'g': e['id']}
            cursor.execute(q, params=p)
            conn.commit()
            
    print(id, generi)
    
    return jsonify(data)

# --------------------------------LOGIN----------------------------------------------------------

@app.route('/Login', methods=['POST'])
def login():
  # Prendo gli argomenti richiesti
  email = request.args.get("email")
  pwd = request.args.get("pwd")
  print(email,' ', pwd)

  data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }

  # Controllo se sono stati passati tutti i parametri richiesti
  if None not in [email, pwd]:
    # Prendo le informazioni dell'utente
    q = 'SELECT * FROM utente WHERE email = %(e)s'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q, params={"e": email})
    res = cursor.fetchall()

    # Controllo se l'utente esiste
    if len(res) < 1:
      data["statusCode"] = 404
      data["errorMessage"] = "No user was found with that email"
    elif not (res[0]["pwd"] == pwd):
      data["statusCode"] = 403
      data["errorMessage"] = "Wrong password"
    else:
      data["data"] = res[0]
      data["statusCode"] = 200
      print('funziono :)')
      
  else:
    data['statusCode'] = 400
    data['errorMessage'] = "No email or password provided"
  
  return jsonify(data)

@app.route('/api/details', methods=['GET'])
def get_details():
  email = request.args.get("email")

  # Prendo tutti gli utente con la email richiesta
  res = get_user(email)

  data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }

  # Controllo se l'utente esiste
  if len(res) < 1:
    data["statusCode"] = 404
    data["errorMessage"] = "User not found"
  else:
    # Restituisco l'utente
    data["data"] = res
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

    q = 'SELECT TOP(30) * FROM manga ' + ('WHERE titolo LIKE %(t)s' if data != None and data != '' else "")
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
    q = 'SELECT TOP(30) * FROM manga WHERE ' + prato + ' ORDER BY Rank'
    print(q)
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()
    print(data)
    return jsonify(data)

#back-end
@app.route('/back-end', methods=['GET'])
def back_end():
    
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q)
    data = cursor.fetchall()
    
    return jsonify(data)



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)
