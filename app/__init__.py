"""
Api de proyectos
"""

from flask import Flask, render_template
from .config import Config
from .utils.db import db
import werkzeug
from flask_login import LoginManager

from .models.users import UserLogin

login_manager = LoginManager()
login_manager.login_view = 'AuthRoute.get_login'


@login_manager.user_loader
def load_user(user_name):
    return UserLogin.query(user_name)


def create_app():
    """Función que crea la aplicación en flask"""
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    login_manager.init_app(app)

    # apis
    from .api import auth
    app.register_blueprint(auth.auth)
    from .api import proyectos
    app.register_blueprint(proyectos.bp)

    # routes
    from .routes import auth_route
    app.register_blueprint(auth_route.bp_auth)
    from .routes import proyecto_route
    app.register_blueprint(proyecto_route.bp)

    @app.errorhandler(werkzeug.exceptions.MethodNotAllowed)
    def handle_method_not_allowed_request(e):
        return {'error': str(e)}, 405

    @app.errorhandler(werkzeug.exceptions.NotFound)
    def handle_not_found_request(e):
        return {'error': str(e)}, 400

    with app.app_context():
        db.create_all()

    return app
