from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_praetorian import Praetorian
from flask_cors import CORS 
from os import path 

DB_NAME = "database.db"

db = SQLAlchemy()
guard = Praetorian()
cors = CORS()

# A generic user model that might be used by an app powered by flask-praetorian
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default='true')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active

def create_app():

    from .views import views

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'ljkhadfaadshjkgfd'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
    
    guard.init_app(app, User)
    db.init_app(app)
    cors.init_app(app)

    app.register_blueprint(views, url_prefix = '/api')

    with app.app_context():
        db.create_all()

    # Add users for the example
    with app.app_context():
        db.create_all()
        if db.session.query(User).filter_by(username='mohit').count() < 1:
            db.session.add(User(
            username='mohit',
            password=guard.hash_password('mohitisgreat'),
            roles='admin'
                ))
        db.session.commit()
        
    return app


