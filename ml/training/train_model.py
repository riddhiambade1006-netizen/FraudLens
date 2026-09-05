# ml/training/train_model.py

import os
import sys
import csv
import json
import math
from collections import defaultdict, Counter
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(BASE_DIR, "..")))

from preprocessing.text_cleaner import TextCleaner

DATASET_PATH = os.path.abspath(os.path.join(BASE_DIR, "../../data/dataset/scam_messages.csv"))
MODEL_OUTPUT_PATH = os.path.abspath(os.path.join(BASE_DIR, "../models/scam_classifier.json"))


def load_dataset(filepath):
    dataset = []
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Dataset not found at {filepath}")

    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            msg = row.get("message", "").strip()
            label = row.get("label", "").strip()
            is_fraud = int(row.get("is_fraud", 1))
            if msg and label:
                dataset.append({
                    "message": msg,
                    "label": label,
                    "is_fraud": is_fraud
                })

    return dataset


class NaiveBayesClassifierTrainer:
    def __init__(self):
        self.classes = set()
        self.class_counts = defaultdict(int)
        self.total_documents = 0
        self.word_counts_by_class = defaultdict(lambda: defaultdict(int))
        self.total_words_by_class = defaultdict(int)
        self.vocabulary = set()

    def train(self, dataset):
        self.total_documents = len(dataset)
        print(f"Training on {self.total_documents} labeled samples...")

        for item in dataset:
            label = item["label"]
            self.classes.add(label)
            self.class_counts[label] += 1

            tokens = TextCleaner.tokenize(item["message"])
            for token in tokens:
                self.vocabulary.add(token)
                self.word_counts_by_class[label][token] += 1
                self.total_words_by_class[label] += 1

        print(f"Discovered {len(self.vocabulary)} distinct features across {len(self.classes)} classes.")

    def export_model(self, output_path):
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        vocab_size = len(self.vocabulary)

        # Log priors
        class_priors = {}
        for c in self.classes:
            class_priors[c] = math.log(self.class_counts[c] / self.total_documents)

        # Log likelihoods with Laplace smoothing (+1)
        feature_log_likelihoods = defaultdict(dict)
        for c in self.classes:
            denom = self.total_words_by_class[c] + vocab_size
            for word in self.vocabulary:
                count = self.word_counts_by_class[c][word]
                prob = (count + 1) / denom
                feature_log_likelihoods[c][word] = round(math.log(prob), 5)

        model_artifact = {
            "metadata": {
                "trained_at": datetime.utcnow().isoformat(),
                "total_documents": self.total_documents,
                "vocabulary_size": vocab_size,
                "classes": sorted(list(self.classes))
            },
            "class_priors": class_priors,
            "feature_log_likelihoods": feature_log_likelihoods,
            "class_counts": dict(self.class_counts),
            "total_words_by_class": dict(self.total_words_by_class),
            "vocabulary": sorted(list(self.vocabulary))
        }

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(model_artifact, f, indent=2)

        print(f"Model successfully trained and saved to: {output_path}")
        print(f"Artifact size: {os.path.getsize(output_path)} bytes")
        return model_artifact


def run_training():
    dataset = load_dataset(DATASET_PATH)
    trainer = NaiveBayesClassifierTrainer()
    trainer.train(dataset)
    trainer.export_model(MODEL_OUTPUT_PATH)


if __name__ == "__main__":
    run_training()
