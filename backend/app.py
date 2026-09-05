from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import sys
import os
import urllib.parse
from datetime import datetime
import random

# Ensure backend root is on sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from ai.detection import ScamDetectionEngine
from ai.prediction import FraudPredictor
from ai.recommendation import RecommendationEngine
from simulator.scenario_engine import ScenarioEngine

detector = ScamDetectionEngine()
predictor = FraudPredictor()
recommender = RecommendationEngine()


class FraudLensServer(BaseHTTPRequestHandler):

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Home
        if path == "/":
            self.send_json({
                "project": "FraudLens",
                "tagline": "See Through the Scam",
                "status": "Running",
                "version": "2.0.0"
            })

        # Main Health
        elif path == "/api/health":
            self.send_json({
                "status": "healthy",
                "timestamp": datetime.now().isoformat()
            })

        # About
        elif path == "/about":
            self.send_json({
                "name": "FraudLens",
                "version": "2.0.0",
                "description": "AI-powered scam simulation and awareness platform."
            })

        # Dashboard
        elif path == "/api/dashboard/health":
            self.send_json({
                "service": "Dashboard API",
                "status": "healthy"
            })

        elif path == "/api/dashboard/stats":
            self.send_json({
                "success": True,
                "dashboard": {
                    "metrics": {
                        "total_simulations": 28,
                        "correct_answers": 23,
                        "incorrect_answers": 5,
                        "accuracy": 82.1
                    },
                    "risk_distribution": {
                        "High": 14,
                        "Medium": 9,
                        "Low": 5
                    },
                    "awareness_score": 82,
                    "scam_breakdown": [
                        { "name": "Banking / OTP", "count": 18, "color": "#f43f5e" },
                        { "name": "UPI Traps", "count": 14, "color": "#f59e0b" },
                        { "name": "Fake Job Offers", "count": 12, "color": "#00f0ff" },
                        { "name": "Investment Ponzi", "count": 9, "color": "#a855f7" },
                        { "name": "Phishing URLs", "count": 7, "color": "#3b82f6" }
                    ],
                    "trend_history": [
                        { "day": "Mon", "score": 65, "accuracy": 60 },
                        { "day": "Tue", "score": 70, "accuracy": 68 },
                        { "day": "Wed", "score": 74, "accuracy": 72 },
                        { "day": "Thu", "score": 78, "accuracy": 80 },
                        { "day": "Fri", "score": 82, "accuracy": 85 },
                        { "day": "Sat", "score": 86, "accuracy": 89 },
                        { "day": "Sun", "score": 88, "accuracy": 91 }
                    ]
                }
            })

        # Simulation
        elif path == "/api/simulation/health":
            self.send_json({
                "service": "Simulation API",
                "status": "healthy"
            })

        elif path == "/api/simulation/scenarios":
            scenarios = ScenarioEngine.load_all_scenarios()
            self.send_json({
                "success": True,
                "count": len(scenarios),
                "scenarios": scenarios
            })

        elif path == "/api/simulation/scenario":
            scenario_id = query.get("id", [None])[0]
            scenario = ScenarioEngine.get_scenario(scenario_id)
            if scenario:
                self.send_json(scenario)
            else:
                self.send_json({"error": "Scenario not found"}, 404)

        # Analysis Health
        elif path == "/api/analysis/health":
            self.send_json({
                "service": "Analysis API",
                "status": "healthy"
            })

        # Report
        elif path == "/api/report/health":
            self.send_json({
                "service": "Report API",
                "status": "healthy"
            })

        elif path == "/api/report/generate":
            now = datetime.now()
            report_id = f"RPT-{now.strftime('%Y%m%d')}-{random.randint(1000, 9999)}"
            self.send_json({
                "success": True,
                "report": {
                    "report_id": report_id,
                    "generated_at": now.strftime("%b %d, %Y, %I:%M %p"),
                    "organization": "FraudLens Threat Intelligence Network",
                    "assessment_tier": "Enterprise Cyber Hygiene & Individual Resilience",
                    "summary": {
                        "total_cases": 28,
                        "high_risk": 14,
                        "medium_risk": 9,
                        "low_risk": 5,
                        "systemic_vulnerabilities": [
                            "Susceptibility to urgent bank KYC suspension pretexts",
                            "Confusion over UPI QR code debit vs credit mechanics",
                            "Tendency to overlook spoofed top-level domains (.cc, .xyz)"
                        ]
                    },
                    "recommendation": "Mandatory reinforcement of OTP secrecy and zero-trust protocol for all inbound communication claiming immediate financial repercussions.",
                    "action_items": [
                        "Enable two-factor biometric authentication on banking applications",
                        "Register phone number on National Do Not Disturb (DND) registry",
                        "Memorize National Cyber Crime Helpline: dial 1930 within 2 hours of any unauthorized debit"
                    ]
                }
            })

        else:
            self.send_json({
                "error": "Not Found"
            }, 404)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)

        if path == "/api/simulation/submit":
            try:
                data = json.loads(post_data) if post_data else {}
                scenario_id = data.get("scenario_id") or data.get("id") or 1
                choice_id = data.get("choice_id")
                answer_text = data.get("answer", "")

                result = ScenarioEngine.evaluate_answer(
                    scenario_id=scenario_id,
                    choice_id=choice_id,
                    answer_text=answer_text
                )
                self.send_json(result)
            except Exception as e:
                self.send_json({"error": str(e)}, 500)

        elif path == "/api/analysis/analyze":
            try:
                data = json.loads(post_data) if post_data else {}
                message = data.get("message", "")

                detection_result = detector.analyze(message)
                prediction_result = predictor.predict_risk(detection_result["risk_score"])
                recommendations = recommender.get_recommendations(detection_result["risk_level"])

                self.send_json({
                    "success": True,
                    "analysis": detection_result,
                    "prediction": prediction_result,
                    "recommendations": recommendations
                })
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, 500)

        else:
            self.send_json({
                "error": "Not Found"
            }, 404)


if __name__ == "__main__":
    server = HTTPServer(
        ("localhost", 5000),
        FraudLensServer
    )

    print("FraudLens Backend Running on http://localhost:5000...")
    server.serve_forever()