# backend/api/dashboard_routes.py

from flask import Blueprint, jsonify

from analytics.analytics_engine import AnalyticsEngine

dashboard_bp = Blueprint("dashboard", __name__)

analytics_engine = AnalyticsEngine()


@dashboard_bp.route("/", methods=["GET"])
def dashboard_home():
    return jsonify({
        "module": "FraudLens Dashboard",
        "status": "active"
    })


@dashboard_bp.route("/stats", methods=["GET"])
def dashboard_stats():

    sample_attempts = [
        {
            "correct": True,
            "risk_level": "High",
            "score": 90
        },
        {
            "correct": False,
            "risk_level": "Medium",
            "score": 60
        },
        {
            "correct": True,
            "risk_level": "Low",
            "score": 80
        }
    ]

    metrics = analytics_engine.generate_dashboard_metrics(
        sample_attempts
    )

    risk_distribution = analytics_engine.risk_distribution(
        sample_attempts
    )

    awareness_score = analytics_engine.awareness_score(
        sample_attempts
    )

    return jsonify({
        "success": True,
        "dashboard": {
            "metrics": metrics,
            "risk_distribution": risk_distribution,
            "awareness_score": awareness_score
        }
    })


@dashboard_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "service": "Dashboard API",
        "status": "healthy"
    })