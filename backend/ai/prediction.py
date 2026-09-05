# backend/ai/prediction.py

class FraudPredictor:
    def __init__(self):
        pass

    def predict_risk(self, risk_score):
        if risk_score >= 80:
            return {
                "prediction": "High Fraud Risk",
                "action": "Block Immediately"
            }
        elif risk_score >= 50:
            return {
                "prediction": "Medium Fraud Risk",
                "action": "Review Carefully"
            }
        else:
            return {
                "prediction": "Low Fraud Risk",
                "action": "Safe to Proceed"
            }


# Test
if __name__ == "__main__":
    predictor = FraudPredictor()

    result = predictor.predict_risk(85)

    print(result)