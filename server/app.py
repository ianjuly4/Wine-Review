#!/usr/bin/env python3
from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS

from config import app, db, api  # Assuming these are correctly configured in config.py
from models import Wine, Review, User

# Initialize CORS and Flask app only once
CORS(app, origins='http://localhost:4000')

# Initialize migraion and API
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

class Home(Resource):
    def get(self):
        response_dict = {
            "message": "Welcome to the Wine RESTful API",
        }
        response = make_response(response_dict, 200)
        return response

api.add_resource(Home, '/')

class Wines(Resource):
    def get(self):
        wine_dict_list = [wine.to_dict() for wine in Wine.query.all()]
        response = make_response(wine_dict_list, 200)
        return response

    def post(self):
        data = request.get_json()
        new_wine = Wine(
            name=data['name'],
            type=data['type'],
            location=data['location'],
            price=data['price'],
            flavor_profile=data['flavor_profile'],
        )
        db.session.add(new_wine)
        db.session.commit()
        response = make_response(new_wine.to_dict(), 201)
        return response

api.add_resource(Wines, '/wines')

class WineByID(Resource):
    def get(self, id):
        wine = Wine.query.filter_by(id=id).first()
        if wine:
            response = make_response(wine.to_dict(), 200)
        else:
            response = make_response({"error": "Wine not found"}, 404)
        return response

    def delete(self, id):
        wine = Wine.query.filter_by(id=id).first()
        if wine:
            db.session.delete(wine)
            db.session.commit()
            response = make_response({"message": "Wine successfully deleted"}, 200)
        else:
            response = make_response({"error": "Wine not found"}, 404)
        return response

    def patch(self, id):
        data = request.get_json()
        wine = Wine.query.filter_by(id=id).first()
        if wine:
            for attr in data:
                setattr(wine, attr, data[attr])
            db.session.commit()
            response = make_response(wine.to_dict(), 200)
        else:
            response = make_response({"error": "Wine not found"}, 404)
        return response

api.add_resource(WineByID, '/wines/<int:id>')

class WineUsersById(Resource):
    def get(self, id):
        wine = Wine.query.filter_by(id=id).first()
        if wine:
            users = [user.to_dict() for user in wine.users]
            response = make_response(users, 200)
        else:
            response = make_response({"error": "Wine not found"}, 404)
        return response

api.add_resource(WineUsersById, '/wines/<int:id>/users')

class Reviews(Resource):
    def get(self):
        review_dict_list = [review.to_dict() for review in Review.query.all()]
        response = make_response(review_dict_list, 200)
        return response

    def post(self):
        data = request.get_json()
        new_review = Review(
            user_id=data['user_id'],
            wine_id=data['wine_id'],
            comment=data['comment'],
            star_review=data['star_review']
        )
        db.session.add(new_review)
        db.session.commit()
        response = make_response(new_review.to_dict(), 201)
        return response

api.add_resource(Reviews, '/reviews')

class Users(Resource):
    def get(self):
        user_dict_list = [user.to_dict() for user in User.query.all()]
        response = make_response(user_dict_list, 200)
        return response

    def post(self):
        data = request.get_json()
        new_user = User(name=data['name'])
        db.session.add(new_user)
        db.session.commit()
        response = make_response(new_user.to_dict(), 201)
        return response

api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            response = make_response(user.to_dict(), 200)
        else:
            response = make_response({"error": "User not found"}, 404)
        return response

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            response = make_response({"message": "User successfully deleted"}, 200)
        else:
            response = make_response({"error": "User not found"}, 404)
        return response

api.add_resource(UserById, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)