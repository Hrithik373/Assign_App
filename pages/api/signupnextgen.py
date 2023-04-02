from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import uuid

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
table = dynamodb.Table('SignupTable')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    item = {
        'userId': str(uuid.uuid4()),
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email'],
        'password': data['password']
    }
    table.put_item(Item=item)
    return jsonify({'message': 'Signup successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
    
    
    
""" the failed signup api code
    from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from werkzeug.security import generate_password_hash
from flask_cors import CORS
import os

# Initialize app
app = Flask(__name__)
CORS(app)

# Set up database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Initialize Marshmallow
ma = Marshmallow(app)


# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __init__(self, first_name, last_name, email, password):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password


# User schema
class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True


# Initialize schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Create a new user
@app.route('/users', methods=['OPTIONS', 'POST'])
def add_user():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, headers)

    first_name = request.json['firstName']
    last_name = request.json['lastName']
    email = request.json['email']
    password = generate_password_hash(request.json['password'], method='sha256')
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User with this email already exists.'}), 409
    
    # Create new user
    new_user = User(first_name, last_name, email, password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user), 201


# Run server
if __name__ == '__main__':
    app.run(debug=True)
"""