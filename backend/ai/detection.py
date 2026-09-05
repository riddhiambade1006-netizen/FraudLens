# backend/ai/detection.py

import re


class ScamDetectionEngine:

    def __init__(self):
        self.scam_patterns = {
            "Phishing": [
                "verify account",
                "click here",
                "login now",
                "update account",
                "suspicious activity"
            ],

            "OTP Scam": [
                "otp",
                "share code",
                "verification code",
                "one time password"
            ],

            "UPI Scam": [
                "upi",
                "collect request",
                "payment request",
                "scan qr",
                "receive money"
            ],

            "Investment Scam": [
                "guaranteed return",
                "double your money",
                "100% profit",
                "investment opportunity"
            ],

            "Loan Scam": [
                "instant loan",
                "loan approved",
                "processing fee",
                "quick loan"
            ],

            "Job Scam": [
                "work from home",
                "earn daily",
                "easy income",
                "job offer"
            ]
        }

    def analyze(self, message):

        message_lower = message.lower()

        detected_type = "Unknown"
        risk_score = 0

        red_flags = []
        tactics = []

        # Detect scam type
        for scam_type, keywords in self.scam_patterns.items():

            matches = sum(
                1 for keyword in keywords
                if keyword in message_lower
            )

            if matches > 0:
                detected_type = scam_type
                risk_score += matches * 15

        # Urgency Detection
        urgency_words = [
            "urgent",
            "immediately",
            "now",
            "within",
            "limited time",
            "expire"
        ]

        if any(word in message_lower for word in urgency_words):
            risk_score += 20
            red_flags.append("Urgent language")
            tactics.append("Urgency")

        # Link Detection
        if re.search(r"http[s]?://", message_lower):
            risk_score += 15
            red_flags.append("Suspicious link")

        # Sensitive Info Request
        sensitive_keywords = [
            "password",
            "otp",
            "pin",
            "bank account",
            "cvv"
        ]

        if any(word in message_lower for word in sensitive_keywords):
            risk_score += 25
            red_flags.append(
                "Request for sensitive information"
            )
            tactics.append("Information Theft")

        # Impersonation
        impersonation_words = [
            "bank",
            "support",
            "customer care",
            "government"
        ]

        if any(word in message_lower for word in impersonation_words):
            risk_score += 10
            red_flags.append("Possible impersonation")
            tactics.append("Impersonation")

        # Cap score
        risk_score = min(risk_score, 100)

        # Risk level
        if risk_score >= 80:
            risk_level = "High"
        elif risk_score >= 50:
            risk_level = "Medium"
        else:
            risk_level = "Low"

        confidence = min(risk_score + 5, 100)

        return {
            "scam_type": detected_type,
            "risk_level": risk_level,
            "risk_score": risk_score,
            "confidence": confidence,
            "red_flags": list(set(red_flags)),
            "tactics": list(set(tactics)),
            "explanation":
                "Prototype rule-based scam detection engine.",
            "recommended_action":
                "Do not interact with suspicious messages. "
                "Verify through official channels."
        }


# Test Run
if __name__ == "__main__":

    detector = ScamDetectionEngine()

    sample_message = """
    Your bank account will be blocked within 10 minutes.
    Verify immediately at https://fake-bank.com
    and share your OTP.
    """

    result = detector.analyze(sample_message)

    print(result)