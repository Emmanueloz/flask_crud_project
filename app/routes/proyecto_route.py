from flask import Blueprint, render_template, request, jsonify

from app.models.proyectos import Proyecto
from flask_login import login_required, current_user
bp = Blueprint('proyecto_routes', __name__)


@bp.get("/")
@login_required
def get_proyectos():
    return render_template('index.jinja')


@bp.get('/proyecto/<id>')
@login_required
def get_proyecto(id):
    print(current_user.id)
    project = Proyecto.query.filter(
        Proyecto.id == id, Proyecto.id_user == current_user.id).all()
    print(current_user.id)
    print(project)
    if len(project) == 0:
        error = {"error": f"el proyecto con id {id} no existe"}

        return render_template('project.jinja', error=error)

    project = project[0].to_json()

    return render_template('project.jinja', **project)
