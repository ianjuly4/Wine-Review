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

        new_review = Review(
            comment=data['review']['comment'],
            star_review=data['review']['star_review']
        )

        new_user = User(
            name=data['user']['name']
        )

        new_wine.reviews.append(new_review)
        new_review.user = new_user

        db.session.add(new_wine)
        db.session.add(new_review)
        db.session.add(new_user)
        db.session.commit()

        response_dict = {
            'wine': new_wine.to_dict(),
            'review': new_review.to_dict(),
            'user': new_user.to_dict()
        }

        response = make_response(
            response_dict,
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

api.add_resource(WineByID, '/wines/<int:id>')


class WineReviews(Resource):
    
       def get(self):
        wine_dict_list = [wine.to_dict() for wine in Wine.query.all()]
        response = make_response(
            wine_dict_list,
            200,
            
        )
        return response

api.add_resource(WineReviews, '/wines/reviews')
  

if __name__ == '__main__':
    app.run(port=5555, debug=True)

