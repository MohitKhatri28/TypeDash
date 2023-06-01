from flask import Blueprint, render_template, request, jsonify
from . import guard, db, cors, User 
import flask_praetorian 
import flask_cors  

views = Blueprint('views', __name__)

@views.route("/login", methods=['POST'])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    """
    req = request.get_json(force=True)
    username = req.get('username', None)
    #print(User.query.filter_by(username=username).first())
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200

@views.route("/sign-up", methods=['GET', 'POST'])
def sign_up():
    return jsonify({"data": "sign-up"})

@views.route("/sign-out", methods=['GET'])
def sign_out():
    return jsonify({"data": "sign-out"})

@views.route('/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200

@views.route('/protected')
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}

