# backend/simulator/scenario_engine.py

import os
import json
import glob

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENARIOS_DIR = os.path.abspath(os.path.join(BASE_DIR, "../../data/scenarios"))


class ScenarioEngine:
    _cached_scenarios = None

    @classmethod
    def load_all_scenarios(cls):
        if cls._cached_scenarios is not None and len(cls._cached_scenarios) > 0:
            return cls._cached_scenarios

        scenarios = []
        json_files = sorted(glob.glob(os.path.join(SCENARIOS_DIR, "*.json")))

        for filepath in json_files:
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if data and "id" in data:
                        scenarios.append(data)
            except Exception as e:
                print(f"Error loading scenario from {filepath}: {e}")

        scenarios.sort(key=lambda x: x.get("id", 0))
        cls._cached_scenarios = scenarios
        return scenarios

    @classmethod
    def get_scenario(cls, scenario_id=None):
        scenarios = cls.load_all_scenarios()
        if not scenarios:
            return None

        if scenario_id is not None:
            for s in scenarios:
                if str(s.get("id")) == str(scenario_id):
                    return s

        return scenarios[0]

    @classmethod
    def evaluate_answer(cls, scenario_id, choice_id=None, answer_text=""):
        scenario = cls.get_scenario(scenario_id)
        if not scenario:
            return {
                "correct": False,
                "score": 0,
                "feedback": "Scenario not found.",
                "explanation": "No explanation available.",
                "red_flags": []
            }

        choices = scenario.get("choices", [])
        matched_choice = None

        if choice_id:
            for c in choices:
                if c.get("id") == choice_id:
                    matched_choice = c
                    break

        if not matched_choice and answer_text:
            # Check keywords
            answer_lower = str(answer_text).lower()
            if any(w in answer_lower for w in ["scam", "fraud", "fake", "block", "ignore"]):
                # find correct choice
                for c in choices:
                    if c.get("isCorrect"):
                        matched_choice = c
                        break

        if matched_choice:
            is_correct = matched_choice.get("isCorrect", False)
            return {
                "correct": is_correct,
                "score": 100 if is_correct else 0,
                "feedback": matched_choice.get("feedback", "Completed evaluation."),
                "explanation": scenario.get("explanation", ""),
                "red_flags": scenario.get("redFlags", [])
            }

        # Default fallback
        is_correct = scenario.get("isScam", True) == False
        return {
            "correct": is_correct,
            "score": 100 if is_correct else 0,
            "feedback": "Scenario evaluation completed.",
            "explanation": scenario.get("explanation", ""),
            "red_flags": scenario.get("redFlags", [])
        }


# Test
if __name__ == "__main__":
    scenarios = ScenarioEngine.load_all_scenarios()
    print(f"Loaded {len(scenarios)} scenarios.")
    s1 = ScenarioEngine.get_scenario(1)
    print("Scenario 1:", s1.get("type"))
    eval_result = ScenarioEngine.evaluate_answer(1, "action-2")
    print("Evaluation:", eval_result)