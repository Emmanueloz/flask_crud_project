"""Api de proyectos"""

from app.utils.token import token_required
from flask import Blueprint, render_template, request, jsonify
from app.models.proyectos import Proyecto
from flask_login import current_user
from app.utils.db import db
bp = Blueprint('proyectos', __name__, url_prefix='/api/proyectos')


@bp.get('/')
@token_required
def get_proyectos():
    """Consulta de proyecto"""
    user_id = request.headers['user_id']
    proyectos = Proyecto.query.filter(
        Proyecto.id_user == user_id).all()
    proyectos = [proyecto.to_json() for proyecto in proyectos]
    # print(proyectos)
    return jsonify(proyectos)


@bp.get('<id>')
@token_required
def get_proyecto(id):
    project = Proyecto.query.get(id)
    print(project)
    if project is None:
        error = {"error": f"el proyecto con id {id} no existe"}
        return error, 404

    project: Proyecto = project.to_json()

    return project, 200


@bp.post('/add')
@token_required
def post_proyecto():
    data_json = request.get_json()
    title = data_json['title']
    id_user = data_json['user_id']
    description = data_json['description']
    start_date = data_json['start_date']
    end_date = data_json['end_date']
    company = data_json['company']
    is_finish = data_json['is_finish']

    idProject = Proyecto.random_id()
    new_project = Proyecto(idProject, id_user, title, description, start_date,
                           end_date, company, is_finish)
    print(new_project.to_json())

    # lista_proyectos.append(new_project)
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_json())


@bp.put('/edit/<id>')
@token_required
def put_proyecto(id):
    data_json = request.get_json()
    title = data_json['title']
    description = data_json['description']
    start_date = data_json['start_date']
    end_date = data_json['end_date']
    company = data_json['company']
    is_finish = data_json['is_finish']
    print(id)
    print(data_json)
    edit_project: Proyecto = Proyecto.query.get(id)

    if edit_project is None:
        return {"error": f"el proyecto con id {id} no existe, no se puede editar"}, 402

    edit_project.title = title
    edit_project.description = description
    edit_project.start_date = start_date
    edit_project.end_date = end_date
    edit_project.company = company
    edit_project.is_finish = is_finish
    db.session.commit()
    """
    for item in lista_proyectos:
        if item.id == int(id):
            item.title = title
            item.description = description
            item.start_date = start_date
            item.end_date = end_date
            item.company = company
            item.is_finish = is_finish
            edit_project = item
            break
            """

    return edit_project.to_json(), 200


@bp.put('/edit-location/<id>')
@token_required
def put_proyecto_location(id):
    data_json = request.get_json()
    latitude = data_json['latitude']
    longitude = data_json['longitude']
    edit_project: Proyecto = Proyecto.query.get(id)
    if edit_project is None:
        return {"error": f"el proyecto con id {id} no existe, no se puede editar"}, 402
    edit_project.latitude = latitude
    edit_project.longitude = longitude
    db.session.commit()

    return edit_project.to_json(), 200


@bp.delete('/delete/<id>')
@token_required
def delete_proyecto(id):
    del_item: Proyecto = Proyecto.query.get(id)

    if del_item is None:
        return {'error': f"el proyecto con id {id} no existe, no se puede eliminar"}, 402

    db.session.delete(del_item)
    db.session.commit()

    return {'msg': "proyecto eliminado satisfactoriamente", 'data': del_item.to_json()}, 200
