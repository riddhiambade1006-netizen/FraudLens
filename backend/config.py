# backend/config.py

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "fraudlens-secret-key"

    SQLALCHEMY_DATABASE_URI = (
        f"sqlite:///{os.path.join(BASE_DIR, '../data/database/fraudlens.db')}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    PROJECT_NAME = "FraudLens"
    PROJECT_TAGLINE = "See Through the Scam"

    MAX_AWARENESS_SCORE = 100
    DEFAULT_XP_REWARD = 10

    AI_ENGINE_MODE = "HYBRID"