from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/backend', methods=['POST'])
def process_data():
    data = request.get_json()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)