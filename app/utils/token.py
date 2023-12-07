from flask import request, jsonify
import jwt
from functools import wraps
from app.models.users import Users
from app.config import Config


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not 'user-id' in request.headers:
            return jsonify({'message': 'a valid user_id is missing'}), 401
        if not token:
            return jsonify({'message': 'a valid token is missing'}), 401

        try:
            data = jwt.decode(token, Config.SECRET_KEY,  algorithms=['HS256'])
            user_token = Users.query.filter_by(
                public_id=data['public_id']).first()
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'token has expired'}), 401
        except jwt.InvalidTokenError as e:
            return jsonify({'message': f'token is invalid: {str(e)}'}), 401

        return f(*args, **kwargs)
    return decorator
