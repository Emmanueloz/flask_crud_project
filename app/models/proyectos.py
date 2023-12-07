"""Modelo de proyectos"""
import random
from app.utils.db import db


class Proyecto(db.Model):
    """Clase del proyecto"""
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.String(100), db.ForeignKey(
        'users.username'), nullable=False)
    title = db.Column(db.String(1000))
    description = db.Column(db.String(1000))
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    company = db.Column(db.String(100))
    is_finish = db.Column(db.Boolean)
    latitude = db.Column(db.Double)
    longitude = db.Column(db.Double)

    def random_id():
        return random.randint(1, 99999)

    def to_json(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "title": self.title,
            "description": self.description,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "company": self.company,
            "is_finish": self.is_finish,
            "latitude": self.latitude,
            "longitude": self.longitude
        }

    def __init__(self, id, id_user, title, description, start_date, end_date, company, is_finish=False, latitude=17.8848, longitude=-92.76) -> None:
        self.id = id
        self.id_user = id_user
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.company = company
        self.is_finish = is_finish
        self.latitude = latitude
        self.longitude = longitude
