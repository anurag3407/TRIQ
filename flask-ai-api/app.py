from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

models = {
    "RELIANCE": joblib.load("model/reliance_model.pkl"),
    "TCS": joblib.load("model/tcs_model.pkl"),
    "HDFC": joblib.load("model/hdfc_model.pkl"),
}

@app.route("/api/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    risk = data.get("risk", "medium")
    portfolio = data.get("portfolio", [])

    days = np.array([[60], [61], [62]])

    recommendations = []
    for name, model in models.items():
        preds = model.predict(days)
        recommendations.append({
            "ticker": name,
            "expectedPrice": round(preds[-1], 2)
        })

    return jsonify({
        "success": True,
        "recommendations": recommendations
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
