from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response
from flask_cors import CORS, cross_origin
import pandas as pd
import json
app = Flask(__name__)
# cors = CORS(app, resources={r"/foo": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

# This is used to get selected attributes from 
# user-set atrributes dictionary of SELECTIONS
ATTRS = ["Case_ID", "Event_ID", "Activity", "Timestamp", "format"] 

# This is user selected (set) attributes dictionary.
# Keys => ATRRS items and VALUES => FILE dataframe columns
SELECTIONS = None

# This is the global pandas dataframe we can use. 
# It won't be None when added
FILE = None 

@app.route('/')
@app.route('/home', methods=["GET"])
def home_route():
    return jsonify({"message": "NIMA GAP"})


@app.route('/tool/file', methods=['POST', "GET"])
def upload_file():
    hello = {}
    global FILE
    if request.method == "GET":
        return jsonify(hello="from tool/file with GET")
    uploaded_file = request.files.get('file', False)
    if uploaded_file != False:
        print("Got the file", type(uploaded_file))
        csv = pd.read_csv(uploaded_file)
        FILE = csv
        print(FILE.describe())
        hello["message"] = "helloooooo"
    return jsonify(hello)


@app.route('/tool/columns', methods=["GET"])
def columns_route():
    global FILE
    tenrows = FILE.head(10)
    return tenrows.to_json()


@app.route('/tool/selecting', methods=["GET", "POST"])
def selecting_route():
    global FILE
    global SELECTIONS
    res = FILE.columns
    if request.method == "POST":
        SELECTIONS = request.json
        print(SELECTIONS)
        return "GOOD"
    else: return json.dumps(res.to_list())


if __name__ == '__main__':
    app.run(debug=True)
