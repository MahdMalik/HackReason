from flask import Flask, request, jsonify
from flask_cors import CORS
from pyswip import Prolog
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/backend', methods=['POST'])
def process_data():
    queryPhrase = request.get_json()

    file_path = r"C:/Users/mahd/Documents/hackreason2024autism/testLogic.pl"

    prolog = Prolog()
    prolog.consult(file_path)  # Load the Prolog file
    # results = list(prolog.query(queryPhrase))
    return jsonify("help in gaia")
    

if __name__ == '__main__':
    app.run(debug=True)