import logging

logging.basicConfig(filename='app.log', level=logging.DEBUG)

app = Flask(__name__)

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
    app.logger.info('Signup successful')
    return jsonify({'message': 'Signup successful'}), 200