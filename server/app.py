#!/usr/bin/env python3
from flask import Flask, jsonify, make_response, request, json
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask import Flask
from flask_cors import CORS

from config import app, db, api
from models import Wine, Review, User
CORS(app, origins='http://localhost:4000')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = True
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
CORS(app)

class Home(Resource):

    def get(self):

        response_dict = {
            "message": "Welcome to the Wine RESTful API",
        }

        response = make_response(
            response_dict,
            200,  

        )

        return response

api.add_resource(Home, '/')

class Wines(Resource):

    def get(self):
        wine_dict_list = [wine.to_dict() for wine in Wine.query.all()]
        response = make_response(
            wine_dict_list,
            200,
        )
        return response

    def post(self):
        data = request.get_json()
        print(data)
        new_wine = Wine(
            name=data['name'],
            type=data['type'],
            location=data['location'],
            price=data['price'],
            flavor_profile=data['flavor_profile'],
        )
        new_wine_dict = new_wine.to_dict()

        db.session.add(new_wine)
        db.session.commit()

        response = make_response(
            new_wine_dict,
            201   
        )
        return response     
     
api.add_resource(Wines, '/wines')

class WineByID(Resource):

    def get(self, id):

        wine_dict = Wine.query.filter_by(id=id).first().to_dict()

        response = make_response(
            wine_dict,
            200, 

        )

        return response
    
    def delete(self, id):

        wine = Wine.query.filter(Wine.id == id).first()

        db.session.delete(wine)
        db.session.commit()

        response_dict = {"message": "wine successfully deleted"}

        response = make_response(
            response_dict,
            200,

        )

        return response
    
    def patch(self, id):
        data = request.get_json()
        wine = Wine.query.filter(Wine.id == id).first()
        for attr in data:
            setattr(wine, attr, data[attr])

        db.session.add(wine)
        db.session.commit()

        response_dict = wine.to_dict()

        response = make_response(
            response_dict,
            201
        )

        return response


api.add_resource(WineByID, '/wines/<int:id>')


class WineUsersById(Resource):

    def get(self, id):
        wine = Wine.query.filter(Wine.id == id).first()

        users = [user.to_dict() for user in wine.users]
        response = make_response(
            users,
            200
        )

        return response
    
api.add_resource(WineUsersById, '/wines/<int:id>/users')

class Reviews(Resource):
    def get(self):
        review_dict_list = [review.to_dict() for review in Review.query.all()]
        response = make_response(
            review_dict_list,
            200,
        )
        return response
    def post(self):
        data = request.get_json()
        print(data)
        new_review = Review(
            user_id=data['user_id'],
            wine_id=data['wine_id'],
            comment=data['comment'],
            star_review=data['star_review']
        )
        new_review_dict = new_review.to_dict()

        db.session.add(new_review)
        db.session.commit()

        response = make_response(
            new_review_dict,
            201   
        )
        return response     
  
      
api.add_resource(Reviews, '/reviews')

class Users(Resource):
    def get(self):
        user_dict_list = [user.to_dict() for user in User.query.all()]
        response = make_response(
            user_dict_list,
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        print(data)
        new_user = User(
            name=data['name']
        )
        new_user_dict = new_user.to_dict()

        db.session.add(new_user)
        db.session.commit()

        response = make_response(
            new_user_dict,
            201   
        )
        return response     
api.add_resource(Users, '/users')

class UserById(Resource):
    def get(self, id):

        user_dict = User.query.filter_by(id=id).first().to_dict()

        response = make_response(
            user_dict,
            200, 

        )

        return response
    
    def delete(self, id):

        user = User.query.filter(User.id == id).first()

        db.session.delete(user)
        db.session.commit()

        response_dict = {"message": "user successfully deleted"}

        response = make_response(
            response_dict,
            200,

        )

        return response
api.add_resource(UserById, '/users/<int:id>')
  

if __name__ == '__main__':
    app.run(port=5555, debug=True)

