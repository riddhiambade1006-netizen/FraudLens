# backend/awareness/awareness_engine.py

class AwarenessEngine:

    def __init__(self):
        self.tips = [
            "Never share OTPs or passwords.",
            "Verify suspicious messages through official channels.",
            "Do not click unknown links.",
            "Check sender details carefully.",
            "Beware of urgent requests for money or information."
        ]

    def get_awareness_tips(self):
        return self.tips

    def calculate_awareness_level(self, score):

        if score >= 80:
            return "Excellent"

        elif score >= 60:
            return "Good"

        elif score >= 40:
            return "Average"

        else:
            return "Needs Improvement"

    def generate_feedback(self, score):

        level = self.calculate_awareness_level(score)

        return {
            "score": score,
            "awareness_level": level,
            "tips": self.tips
        }


# Test
if __name__ == "__main__":

    engine = AwarenessEngine()

    print("Awareness Tips:")
    print(engine.get_awareness_tips())

    print("\nFeedback:")
    print(engine.generate_feedback(75))