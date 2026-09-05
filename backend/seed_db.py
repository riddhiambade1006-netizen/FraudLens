# backend/seed_db.py

import os
import sys
from datetime import datetime, timedelta
from flask import Flask

# Setup path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from config import Config
from database import db, init_db
from models import User, Scenario, SimulationAttempt, RedFlag, Report
from simulator.scenario_engine import ScenarioEngine


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    return app


def seed_database():
    app = create_app()
    db_path = os.path.abspath(os.path.join(BASE_DIR, "../data/database/fraudlens.db"))
    os.makedirs(os.path.dirname(db_path), exist_ok=True)

    print(f"Initializing SQLite database at: {db_path}")

    with app.app_context():
        # Initialize schema tables
        init_db(app)

        # Clear existing data if present to ensure clean state
        db.session.query(RedFlag).delete()
        db.session.query(SimulationAttempt).delete()
        db.session.query(Report).delete()
        db.session.query(Scenario).delete()
        db.session.query(User).delete()
        db.session.commit()

        print("Creating seed users...")
        user1 = User(
            name="Cyber Defender",
            email="defender@fraudlens.io",
            awareness_score=82,
            created_at=datetime.utcnow() - timedelta(days=14)
        )
        user2 = User(
            name="Security Analyst",
            email="analyst@fraudlens.io",
            awareness_score=94,
            created_at=datetime.utcnow() - timedelta(days=30)
        )
        db.session.add_all([user1, user2])
        db.session.commit()

        print("Loading and seeding scenarios...")
        scenario_list = ScenarioEngine.load_all_scenarios()

        scenario_map = {}
        for sc in scenario_list:
            scenario_obj = Scenario(
                id=sc.get("id"),
                title=sc.get("type", "Unknown Scenario"),
                category=sc.get("category", "General"),
                difficulty=sc.get("difficulty", "Medium"),
                message=sc.get("message", ""),
                risk_level="High" if sc.get("isScam", True) else "Low"
            )
            db.session.add(scenario_obj)
            scenario_map[sc.get("id")] = scenario_obj

            # Add Red Flags
            for rf in sc.get("redFlags", []):
                red_flag_obj = RedFlag(
                    scenario_id=sc.get("id"),
                    description=rf
                )
                db.session.add(red_flag_obj)

        db.session.commit()

        print("Seeding sample simulation attempts...")
        attempts_data = [
            (user1.id, 1, "action-2", True, 100, 2),
            (user1.id, 2, "action-2", True, 100, 3),
            (user1.id, 3, "action-1", False, 0, 5),
            (user1.id, 4, "action-1", True, 100, 6),
            (user1.id, 5, "action-3", True, 100, 8),
            (user1.id, 6, "action-1", True, 100, 10),
            (user2.id, 1, "action-2", True, 100, 1),
            (user2.id, 2, "action-2", True, 100, 2),
            (user2.id, 3, "action-2", True, 100, 3),
            (user2.id, 4, "action-1", True, 100, 4)
        ]

        for u_id, s_id, ans, is_corr, sc, days_ago in attempts_data:
            attempt = SimulationAttempt(
                user_id=u_id,
                scenario_id=s_id,
                user_answer=ans,
                correct=is_corr,
                score=sc,
                created_at=datetime.utcnow() - timedelta(days=days_ago)
            )
            db.session.add(attempt)

        print("Seeding sample audit reports...")
        report1 = Report(
            user_id=user1.id,
            score=82,
            summary="User demonstrates strong vigilance against OTP frauds and UPI scams, but needs reinforcement on advance-fee job offers.",
            created_at=datetime.utcnow() - timedelta(days=2)
        )
        report2 = Report(
            user_id=user2.id,
            score=94,
            summary="Excellent baseline cyber resilience across banking, investment Ponzi, and digital arrest deception vectors.",
            created_at=datetime.utcnow() - timedelta(days=5)
        )
        db.session.add_all([report1, report2])
        db.session.commit()

        # Print stats
        u_count = User.query.count()
        s_count = Scenario.query.count()
        rf_count = RedFlag.query.count()
        att_count = SimulationAttempt.query.count()
        rep_count = Report.query.count()

        print("\nDatabase seeded successfully!")
        print(f" - Users: {u_count}")
        print(f" - Scenarios: {s_count}")
        print(f" - Red Flags: {rf_count}")
        print(f" - Simulation Attempts: {att_count}")
        print(f" - Reports: {rep_count}")
        print(f" - SQLite File Size: {os.path.getsize(db_path)} bytes")


if __name__ == "__main__":
    seed_database()
