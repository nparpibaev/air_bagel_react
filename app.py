from flask import Flask, request, jsonify, Response, make_response
from flask_cors import CORS
import pandas as pd
import json
app = Flask(__name__)

# cors = CORS(app, resources={r"/foo": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

# This is the anomalies to add in the file and it is set in /tool/anomalies route by frontend. how to get it:
# key name - "Resource" gives dict for resource anomalies and "System" gives for system
# the given dicts have key - "probDist" for distribution type and "anomalies" for anomalies object to add
# one example: if ANOMALIES_TO_ADD has Resource key, then the value for that key should be smth like this:
'''
    ANOMALIES_TO_ADD["Resource"] = {
        "probDist": {
            "Random"
        },
        "anomalies": {
            "Skip": {
                "strength": "3"
            },
            "Insert": {
                "strength": "7",
                "max-length": "10"
            }
        }
    } 
'''
# Note1: the "Insert" has "max-length" attr but "Skip" doesnt
# Note2: check the types or type cast when using the values like "strength" 
ANOMALIES_TO_ADD = {}

# This is used to get selected attributes from 
# user-set atrributes dictionary of SELECTIONS
ATTRS = ["Case_ID", "Event_ID", "Activity", "Timestamp", "format", "Resource", "System"] 



# This is a reference for the anomaly types that are supported
# it can be used to get the anomalies in ANOMALIES_TO_ADD. The names are the same
ANOMALIES = {
    "Resource": [
        "Skip",
        "Switch",
        "Replace",
        "Incomplete",
        "Rework",
        "Form based",
        "Insert"
    ],
    "System":[
        "Skip",
        "Form based",
        "Cut"
    ],
}


# This is used to get the params of probability distributions for resource and random
# The format is like this: PARAMS["Resource"] or PARAMS["System"] returns an object like this:
'''
    PARAMS["Resource"] = {
        "probDist": "Random (Exponential dist.)",
        "params": [
            {"lambda": "2"}
        ]
    }
'''
PARAMS = {}

# This is user selected (set) attributes dictionary.
# Keys => ATRRS items(above variable) and VALUES => FILE dataframe columns
SELECTIONS = {}

# This is the global pandas dataframe we can use. 
# It won't be None when added
FILE = pd.DataFrame()

@app.route('/')
@app.route('/home', methods=["GET"])
def home_route():
    return "Ok",200


@app.route('/tool/file', methods=['POST', "GET"])
def upload_file():
    hello = {}
    global FILE
    if request.method == "GET":
        return "Ok", 200
    uploaded_file = request.files.get('file', False)
    if uploaded_file != False:
        csv = pd.read_csv(uploaded_file)
        FILE = csv
        print(FILE.describe())
    return "Ok"


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
        print("POST: ", request.get_json())
        SELECTIONS = request.get_json()
        print(SELECTIONS)
        return "Ok"
    else: 
        print("GET: ", json.dumps(res.to_list()))
        return json.dumps(res.to_list())


@app.route('/tool/anomalies', methods=["POST"])
def anomalies_route():
    resp = Response("Ok")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    global ANOMALIES_TO_ADD
    data = request.get_json()
    if data:
        temp = {}
        temp["probDist"] = data["probDist"]
        temp["anomalies"] =  data["anomalies"]
        print(data["anomalies"])
        ANOMALIES_TO_ADD[data["name"]] = temp
    return resp


@app.route('/tool/parameter', methods=["POST", "GET"])
def parameter_route():
    resp = Response("Ok")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    global PARAMS
    global FILE
    global SELECTIONS
    if request.method == "POST":
        data = request.get_json()
        if data:
            type = data["name"]
            temp = {}
            temp["probDist"] = data["probDist"]
            temp["params"] = data["params"]
            PARAMS[type] = temp
            print(PARAMS[type])
            return resp
        return "data not ok"
    else:
        col = SELECTIONS["Resource"]
        resources = FILE[col].tolist()
        print(set(resources))
        resp = make_response(jsonify(list(set(resources))))
        resp.headers["Access-Control-Allow-Origin"] = '*'
        return resp

@app.route('/tool/simulate', methods=["GET"])
def simulate_route():
    global FILE
    resp = make_response(FILE.to_csv())
    resp.headers["Content-Disposition"] = "attachment; filename=export.csv"
    resp.headers["Content-Type"] = "text/csv"
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run(debug=True)
