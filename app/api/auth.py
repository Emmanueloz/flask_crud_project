from flask import Blueprint, request, jsonify, make_response
from flask_login import login_user
from app.utils.db import db
from app.utils.token import token_required
from app.models.users import Users, UserLogin
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
from app.config import Config
auth = Blueprint("AuthApi", __name__, url_prefix="/api/auth")


@auth.post("/sing-up")
def singup():
    data_json = request.get_json()
    username = data_json['username']
    email = data_json['email']
    passwd = str(data_json['password'])
    if not username or not email or not passwd:
        # return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})
        return {"error": "Datos requeridos para crear el usuario"}, 401

    user = Users.query.filter(Users.username == username)
    if user is None:
        # return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})
        return {"error": "Usuario ya existente"}, 401

    passwd_hash = generate_password_hash(passwd)

    new_user = Users(username, email, passwd_hash, str(uuid.uuid4()))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'registered successfully', "status": "ok"})


@auth.route('/login', methods=['GET', 'POST'])
def login():
    data_json = request.get_json()
    username = data_json['username']
    passwd = str(data_json['password'])
    print(data_json)
    if not username or not passwd:

        return {"error": "Usuario o contraseña requerido"}, 401

    user: Users = Users.query.filter(
        Users.username == username).first()

    if user is None:
        return {"error": "Usuario o contraseña invalido"}

    if check_password_hash(user.passwd, passwd):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=30)}, Config.SECRET_KEY, algorithm='HS256')
        user_login = UserLogin(user.username, user.email, user.passwd)
        login_user(user_login)
        return jsonify({'token': token, "user_id": user.username})

    # return make_response('could not verify1',  401, {'WWW.Authentication': 'Basic realm: "login required"'})
    return {"error": "contraseña incorrecta"}


@auth.put("/user")
@token_required
def put_user():
    data_json = request.get_json()
    username = data_json['username']
    email = data_json['email']
    passwd = str(data_json['password'])
    newPasswd = data_json['newPassword'] if data_json['newPassword'] else None
    print(data_json)
    if not username or not email or not passwd:
        return {"error": "Usuario, email o contraseña requerido"}, 401

    user: Users = Users.query.filter(
        Users.username == username).first()

    if user is None:
        return {"error": "Usuario o contraseña invalido"}, 401

    if check_password_hash(user.passwd, passwd):
        user.email = email
        msg = 'correo modificado correctamente'
        if newPasswd:
            user.passwd = generate_password_hash(newPasswd)
            msg = "correo o contraseña modificado correctamente"
        db.session.commit()

        return jsonify({'message': msg, "status": "ok"})

    return {"error": "Contraseña invalido"}
