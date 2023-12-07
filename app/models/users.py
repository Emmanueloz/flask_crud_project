from app.utils.db import db
from flask_login import UserMixin


class Users(db.Model):
    username = db.Column(db.String(100), primary_key=True)
    email = db.Column(db.String(1000))
    passwd = db.Column(db.String(10000))
    public_id = db.Column(db.Text)

    def __init__(self, username, email, passwd, public_id) -> None:
        self.username = username
        self.email = email
        self.passwd = passwd
        self.public_id = public_id


class UserLogin(UserMixin):
    def __init__(self, username, email, passwd) -> None:
        self.id = username
        self.email = email
        self.passwd = passwd

    @staticmethod
    def query(username):
        user: Users = Users.query.filter(Users.username == username).first()
        return UserLogin(user.username, user.email, user.passwd)
