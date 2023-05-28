from flask import Blueprint, render_template, request, jsonify

views = Blueprint('views', __name__)

@views.route("/login", methods=['GET', 'POST'])
def login():
    return jsonify({"data": "login"})

@views.route("/sign-up", methods=['GET', 'POST'])
def sign_up():
    return jsonify({"data": "sign-up"})

@views.route("/sign-out", methods=['GET'])
def sign_out():
    return jsonify({"data": "sign-out"})