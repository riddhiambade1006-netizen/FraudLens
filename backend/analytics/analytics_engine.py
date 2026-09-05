# backend/analytics/analytics_engine.py

class AnalyticsEngine:
    def __init__(self):
        pass

    def generate_dashboard_metrics(self, attempts):
        total_simulations = len(attempts)

        correct_answers = sum(
            1 for attempt in attempts
            if attempt.get("correct", False)
        )

        incorrect_answers = total_simulations - correct_answers

        accuracy = (
            round((correct_answers / total_simulations) * 100, 2)
            if total_simulations > 0 else 0
        )

        return {
            "total_simulations": total_simulations,
            "correct_answers": correct_answers,
            "incorrect_answers": incorrect_answers,
            "accuracy": accuracy
        }

    def risk_distribution(self, attempts):
        distribution = {
            "High": 0,
            "Medium": 0,
            "Low": 0
        }

        for attempt in attempts:
            risk_level = attempt.get("risk_level", "Low")

            if risk_level in distribution:
                distribution[risk_level] += 1

        return distribution

    def awareness_score(self, attempts):
        if not attempts:
            return 0

        total_score = sum(
            attempt.get("score", 0)
            for attempt in attempts
        )

        return round(total_score / len(attempts), 2)


# Test
if __name__ == "__main__":

    sample_attempts = [
        {
            "correct": True,
            "risk_level": "High",
            "score": 90
        },
        {
            "correct": False,
            "risk_level": "Medium",
            "score": 50
        },
        {
            "correct": True,
            "risk_level": "Low",
            "score": 80
        }
    ]

    engine = AnalyticsEngine()

    print("Dashboard Metrics:")
    print(engine.generate_dashboard_metrics(sample_attempts))

    print("\nRisk Distribution:")
    print(engine.risk_distribution(sample_attempts))

    print("\nAwareness Score:")
    print(engine.awareness_score(sample_attempts))