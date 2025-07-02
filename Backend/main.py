#import ticTacMove
from ticTacMove import get_move
from flask import request,jsonify,Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/get_next_move", methods=["GET"])

def get_next_move():
    return { "nextMoveX" : 3, "nextMoveY" : 3 }

@app.route("/feed_data", methods=["POST"])

def feed_data():
    arr = request.json.get("arr")
    val = get_move(arr)
    return val


if __name__ == "__main__":
    app.run(debug=True)
