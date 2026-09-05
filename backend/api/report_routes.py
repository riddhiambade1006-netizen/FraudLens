# backend/api/report_routes.py

from flask import Blueprint, jsonify
from datetime import datetime

report_bp = Blueprint("report", __name__)


@report_bp.route("/", methods=["GET"])
def report_home():
    return jsonify({
        "module": "FraudLens Reports",
        "status": "active"
    })


@report_bp.route("/generate", methods=["GET"])
def generate_report():

    report = {
        "report_id": "RPT-001",
        "generated_at": datetime.now().strftime(
            "%Y-%m-%d %H:%M:%S"
        ),
        "summary": {
            "total_cases": 25,
            "high_risk": 10,
            "medium_risk": 8,
            "low_risk": 7
        },
        "recommendation":
            "Increase awareness training and verify suspicious messages."
    }

    return jsonify({
        "success": True,
        "report": report
    })


@report_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "service": "Report API",
        "status": "healthy"
    })