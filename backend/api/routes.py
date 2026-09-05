# backend/api/routes.py

from flask import Blueprint, jsonify

main_bp = Blueprint("main", __name__)


@main_bp.route("/", methods=["GET"])
def home():
    return jsonify({
        "project": "FraudLens",
        "tagline": "See Through the Scam",
        "status": "Running"
    })


@main_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


@main_bp.route("/about", methods=["GET"])
def about():
    return jsonify({
        "name": "FraudLens",
        "version": "1.0.0",
        "description": "AI-powered scam detection and awareness platform."
    })


@main_bp.route("/version", methods=["GET"])
def version():
    return jsonify({
        "version": "1.0.0"
    })