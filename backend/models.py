# backend/models.py

from datetime import datetime
from database import db


# =========================
# User Model
# =========================
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    awareness_score = db.Column(db.Integer, default=0)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def __repr__(self):
        return f"<User {self.name}>"



# =========================
# Scenario Model
# =========================
class Scenario(db.Model):
    __tablename__ = "scenarios"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    category = db.Column(db.String(100), nullable=False)

    difficulty = db.Column(db.String(50), nullable=False)

    message = db.Column(db.Text, nullable=False)

    risk_level = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f"<Scenario {self.title}>"



# =========================
# Simulation Attempt Model
# =========================
class SimulationAttempt(db.Model):
    __tablename__ = "simulation_attempts"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    scenario_id = db.Column(
        db.Integer,
        db.ForeignKey("scenarios.id"),
        nullable=False
    )

    user_answer = db.Column(db.String(255))

    correct = db.Column(db.Boolean, default=False)

    score = db.Column(db.Integer, default=0)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user = db.relationship(
        "User",
        backref="attempts"
    )

    scenario = db.relationship(
        "Scenario",
        backref="attempts"
    )



# =========================
# Red Flag Model
# =========================
class RedFlag(db.Model):
    __tablename__ = "red_flags"

    id = db.Column(db.Integer, primary_key=True)

    scenario_id = db.Column(
        db.Integer,
        db.ForeignKey("scenarios.id"),
        nullable=False
    )

    description = db.Column(
        db.String(255),
        nullable=False
    )

    scenario = db.relationship(
        "Scenario",
        backref="red_flags"
    )



# =========================
# Report Model
# =========================
class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    score = db.Column(db.Integer)

    summary = db.Column(db.Text)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user = db.relationship(
        "User",
        backref="reports"
    )