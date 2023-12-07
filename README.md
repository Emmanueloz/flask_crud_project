# CRUD hecho en Flask sobre proyectos

Autor: David Emmanuel Ozuna Navarro

[Repositorio](https://github.com/Emmanueloz/flask_crud_project)

## Entorno virtual

Para iniciar el proyecto, primero hay que crear el entorno virtual

```bash
python -m venv .venv
```

Con el siguiente comando activamos el entorno virtual

**Linux**

```bash
source .venv/bin/activate
```

**Windows**

```powershell
.\.venv\Scripts\activate
```

## Requerimientos

Instalar las dependencias del _requirements.txt_

```bash
pip install -r requirements.txt
```

## Variables de entorno y base de datos

Cambiar el nombre del archivo `.env_example.env` por `.env` y coloca los valores importantes

- SECRET_KEY: Debe ser una cadena de texto segura, puedes obtenerlo con uno de los siguientes comandos:
  ```bash
  python -c 'import secrets; print(secrets.token_hex())'
  # o
  openssl rand -hex 32
  ```
- SQLALCHEMY_DATABASE_URI: Esta variable es para la conexión a la base de datos debe tener la siguiente estructura
  ```
  mysql+pymysql://userDB:passwordDB@hostdb:3306/database
  ```
  cambia el usuario, contraseña, host y la base de datos que corresponda

También debes crear la base de datos en mysql con el nombre que especificaste en la variable de conexión, ten en cuenta que el usuario debe tener permisos para la bd

Ya que todo esta listo, ejecuta el siguiente comando para arrancar el proyecto

```bash
flask --app app run --debug
```
