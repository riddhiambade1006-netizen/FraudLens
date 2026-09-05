# backend/ai/risk_score.py

class RiskScorer:
    def __init__(self):
        pass

    def calculate_score(self, red_flags):
        score = len(red_flags) * 20

        if score > 100:
            score = 100

        return score

    def get_risk_level(self, score):
        if score >= 80:
            return "High"
        elif score >= 50:
            return "Medium"
        else:
            return "Low"


# Test
if __name__ == "__main__":
    scorer = RiskScorer()

    red_flags = [
        "Urgent Language",
        "Suspicious Link",
        "Request for OTP",
        "Impersonation"
    ]

    score = scorer.calculate_score(red_flags)
    level = scorer.get_risk_level(score)

    print("Risk Score:", score)
    print("Risk Level:", level)