# backend/api/simulation_routes.py

from flask import Blueprint, request, jsonify
import random

simulation_bp = Blueprint("simulation", __name__)


@simulation_bp.route("/", methods=["GET"])
def simulation_home():
    return jsonify({
        "module": "FraudLens Simulator",
        "status": "active"
    })


@simulation_bp.route("/scenario", methods=["GET"])
def get_scenario():

    scenarios = [
        {
            "id": 1,
            "type": "OTP Scam",
            "message": "Your bank account will be blocked. Share OTP immediately."
        },
        {
            "id": 2,
            "type": "Lottery Scam",
            "message": "Congratulations! You won ₹25,00,000. Pay processing fee."
        },
        {
            "id": 3,
            "type": "Job Scam",
            "message": "Earn ₹10,000 daily from home. Registration fee required."
        }
    ]

    return jsonify(random.choice(scenarios))


@simulation_bp.route("/submit", methods=["POST"])
def submit_answer():

    data = request.get_json()

    user_answer = data.get("answer", "").lower()

    if user_answer in ["scam", "fraud", "fake"]:
        result = {
            "correct": True,
            "score": 100,
            "feedback": "Excellent! You identified the scam."
        }
    else:
        result = {
            "correct": False,
            "score": 0,
            "feedback": "Incorrect. This was a scam scenario."
        }

    return jsonify(result)


@simulation_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "service": "Simulation API",
        "status": "healthy"
    })