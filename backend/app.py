from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data_store = {}

# ✅ ADD THIS
@app.route("/")
def home():
    return "Backend is running"

@app.route("/save", methods=["POST"])
def save():
    data = request.json
    user = data.get("user")
    data_store[user] = data
    return jsonify({"message": "Saved successfully"})

@app.route("/get/<user>")
def get(user):
    return jsonify(data_store.get(user, {}))

if __name__ == "__main__":
    app.run(debug=True)