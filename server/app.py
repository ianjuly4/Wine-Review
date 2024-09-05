#!/usr/bin/env python3
from flask import Flask, jsonify, make_response, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask import Flask
from flask_cors import CORS


from config import app, db, api
from models import Wine, Review, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = True
migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)
CORS(app)



@app.route('/')
def home():

        response_dict = {
            "message": "Welcome to the Wine RESTful API",
        }

        response = make_response(
            response_dict,
            200
        )

        return response

#api.add_resource(Home, '/')

@app.route('/wines', methods=["GET","POST"])
def show_wines():
    if request.method == "GET":
        wines = Wine.query.all()
        all_wines = []
        for wine in wines:
            all_wines.append(wine.to_dict())
        response = make_response(
            all_wines,
            200
        )
        return response
    
    elif request.method == "POST":
        data=request.get_json()
        print(data)
        new_wines = Wine(
            name = data['name'],
            type = data['type'],
            flavor_profile = data['flavor_profile'],
            location = data['location'],
            price = data['price'],
        )
        db.session.add(new_wines)
        db.session.commit()
        new_wine_dict = new_wines.to_dict()
        response = make_response(
            new_wine_dict,
            201
        )
        return response
#api.add_resource(Wines, '/wines')



@app.route('/wine/<int:id>', methods=["GET", "PATCH", "DELETE"]) 
def wine_by_id():
    wine_by_id =  Wine.query.filter(Wine.id ==id).first()

    if request.method == "GET":
        wine_by_id_dict = wine_by_id.to_dict()
        response = make_response(
            wine_by_id_dict,
            200,
        )
        return response
    
    elif request.method == "DELETE":
        db.session.delete(wine_by_id)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}
        response = make_response(
            response_dict,
            200
        )
        return response

    def patch(self, id):

        wine = Wine.query.filter(Wine.id == id).first()
        for attr in request.form:
            setattr(wine, attr, request.form[attr])

        db.session.add(wine)
        db.session.commit()

        response_dict = wine.to_dict()

        response = make_response(
            response_dict,
            202
        )

        return response
    
    




if __name__ == '__main__':
    app.run(port=5555, debug=True)

