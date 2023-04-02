from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import uuid

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5000"}}, supports_credentials=True)

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('SignupTable')

@app.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    try:
        data = request.get_json()
        item = {
            'userId': str(uuid.uuid4()),
            'firstName': data['firstName'],
            'lastName': data['lastName'],
            'email': data['email'],
            'password': data['password']
        }
        table.put_item(Item=item)
        response_data = {'message': 'Signup successful'}
        status_code = 200
    except Exception as e:
        response_data = {'message': str(e)}
        status_code = 500
    
    response = jsonify(response_data)
    response.headers.add('Content-Type', 'application/json')
    return response, status_code

    
if __name__ == '__main__':
    app.run(debug=True)