
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, create_access_token
import hashlib
from hashlib import sha256
import random





api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])

def handle_signup():
    body = request.json
    first_name = body['first_name']
    last_name = body['last_name']
    body_email = body['email']
    body_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User(email=body_email, password=body_password, first_name=first_name, last_name = last_name, is_active=True)
    
    db.session.add(user)
    db.session.commit()

    return jsonify({ "msg": "User created successfully", "user_id": user.id  }), 200


@api.route('/login', methods=['POST'])
def handle_login():

    body = request.get_json() 
    body_email = body['email']
    body_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User.query.filter_by(email = body_email).first()
    if user and user.password == body_password:
        access_token = create_access_token(identity = user.email)
        return jsonify(access_token = access_token), 200 
    else:
        return jsonify("User not Found"), 400
    


@api.route('/private', methods=[ 'GET'])
@jwt_required()
def handle_private():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    
    if user and user.is_active:
        return jsonify(user=user.serialize()), 200
    else:
        return jsonify({"error": "Unauthorized or inactive user"}), 403



@api.route('/api/update_profile', methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        user_email = get_jwt_identity()
        data = request.json
        user = User.query.filter_by(email=user_email).first()

        if not user:
            return jsonify({ "msg": "User not found" }), 404

        new_password = data.get("password")
        if new_password:
            user.password = sha256(new_password.encode("utf-8")).hexdigest()

        db.session.commit()
        return jsonify({ "msg": "Password updated successfully" }), 200

    except Exception as e:
        return jsonify({ "msg": "Internal Server Error", "error": str(e) }), 500

@api.route('/random-content', methods=['GET'])
def get_random_content():
    try:
        music = db.session.execute(db.select(MediaItem).filter_by(category="music")).scalars().all()
        books = db.session.execute(db.select(MediaItem).filter_by(category="book")).scalars().all()
        movies = db.session.execute(db.select(MediaItem).filter_by(category="movie")).scalars().all()

        print("Music:", music)
        print("Books:", books)
        print("Movies:", movies)

        def random_one(items):
            return random.choice(items).serialize() if items else {}

        return jsonify({
            "music": random_one(music),
            "book": random_one(books),
            "movie": random_one(movies)
        })

    except Exception as e:
        print("ERROR in /random-content:", e)
        return jsonify({ "error": str(e) }), 500






