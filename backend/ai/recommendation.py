# backend/ai/recommendation.py

class RecommendationEngine:
    def __init__(self):
        pass

    def get_recommendations(self, risk_level):
        recommendations = {
            "High": [
                "Do not respond to the sender.",
                "Block and report the account.",
                "Do not click suspicious links.",
                "Verify through official channels."
            ],
            "Medium": [
                "Proceed with caution.",
                "Verify sender identity.",
                "Avoid sharing personal information."
            ],
            "Low": [
                "No major threat detected.",
                "Continue normal monitoring."
            ]
        }

        return recommendations.get(
            risk_level,
            ["No recommendations available."]
        )


# Test
if __name__ == "__main__":
    engine = RecommendationEngine()

    result = engine.get_recommendations("High")

    print(result)