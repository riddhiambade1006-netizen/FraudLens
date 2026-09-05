# backend/api/analysis_routes.py

from flask import Blueprint, request, jsonify

from ai.detection import ScamDetectionEngine
from ai.prediction import FraudPredictor
from ai.risk_score import RiskScorer
from ai.recommendation import RecommendationEngine

analysis_bp = Blueprint("analysis", __name__)

detector = ScamDetectionEngine()
predictor = FraudPredictor()
risk_scorer = RiskScorer()
recommendation_engine = RecommendationEngine()


@analysis_bp.route("/", methods=["GET"])
def analysis_home():
    return jsonify({
        "module": "FraudLens Analysis API",
        "status": "active"
    })


@analysis_bp.route("/analyze", methods=["POST"])
def analyze_message():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "message": "No data provided"
            }), 400

        message = data.get("message", "")

        if not message:
            return jsonify({
                "success": False,
                "message": "Message is required"
            }), 400

        # Scam Detection
        detection_result = detector.analyze(message)

        # Risk Score
        risk_score = detection_result["risk_score"]

        # Prediction
        prediction_result = predictor.predict_risk(
            risk_score
        )

        # Recommendations
        recommendations = (
            recommendation_engine.get_recommendations(
                detection_result["risk_level"]
            )
        )

        return jsonify({
            "success": True,

            "analysis": {
                "scam_type":
                    detection_result["scam_type"],

                "risk_level":
                    detection_result["risk_level"],

                "risk_score":
                    detection_result["risk_score"],

                "confidence":
                    detection_result["confidence"],

                "red_flags":
                    detection_result["red_flags"],

                "tactics":
                    detection_result["tactics"],

                "explanation":
                    detection_result["explanation"],

                "recommended_action":
                    detection_result[
                        "recommended_action"
                    ]
            },

            "prediction":
                prediction_result,

            "recommendations":
                recommendations
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@analysis_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "service": "Analysis API",
        "status": "healthy"
    })