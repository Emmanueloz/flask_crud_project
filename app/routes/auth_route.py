from flask import Blueprint, render_template, redirect, url_for
from flask_login import current_user, logout_user, login_required
from app.models.users import Users

bp_auth = Blueprint("AuthRoute", __name__, url_prefix="/auth")


@bp_auth.get("/login")
def get_login():
    if current_user.is_authenticated:
        return redirect(url_for('proyecto_routes.get_proyectos'))
    return render_template("form_auth.jinja")


@bp_auth.get("/logout")
def logout():
    logout_user()
    return redirect(url_for('AuthRoute.get_login'))


@bp_auth.get("/user")
@login_required
def user():
    return render_template("user.jinja")
