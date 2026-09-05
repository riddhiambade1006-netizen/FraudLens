# backend/reports/report_service.py

from datetime import datetime

class ReportService:

    @staticmethod
    def generate_report(data):
        report = {
            "report_id": f"RPT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "generated_at": datetime.now().isoformat(),
            "summary": "Fraud Analysis Report",
            "risk_level": data.get("risk_level", "Unknown"),
            "risk_score": data.get("risk_score", 0),
            "recommendation": data.get(
                "recommended_action",
                "No recommendation available"
            )
        }

        return report


# Test
if __name__ == "__main__":
    sample_data = {
        "risk_level": "High",
        "risk_score": 85,
        "recommended_action": "Do not click suspicious links."
    }

    print(ReportService.generate_report(sample_data))