# ml/preprocessing/text_cleaner.py

import re

# Curated lightweight stopwords list (omitting urgency words like 'now', 'within', 'immediately')
STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", 
    "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", 
    "by", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further", 
    "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", 
    "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", 
    "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", 
    "our", "ours", "ourselves", "out", "over", "own", "s", "same", "she", "should", "so", "some", 
    "such", "t", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", 
    "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "very", 
    "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", 
    "with", "you", "your", "yours", "yourself", "yourselves"
}


class TextCleaner:
    @staticmethod
    def normalize_text(text):
        if not text or not isinstance(text, str):
            return ""

        text = text.lower()

        # Normalize URLs
        text = re.sub(r"https?://\S+|www\.\S+|\b\S+\.(?:cc|xyz|top|link|tk|ml)\b", " <url> ", text)

        # Normalize currency amounts (INR, Rs, $, USDT, etc.)
        text = re.sub(r"(?:rs\.?|inr|₹|\$)\s*\d+(?:,\d+)*(?:\.\d+)?", " <currency> ", text)

        # Normalize phone numbers
        text = re.sub(r"\+?\d{1,3}[-.\s]?\d{4,5}[-.\s]?\d{4,5}", " <phone> ", text)

        # Normalize numbers
        text = re.sub(r"\b\d+\b", " <number> ", text)

        # Remove special characters / punctuation
        text = re.sub(r"[^\w\s<>]", " ", text)

        # Collapse whitespace
        text = re.sub(r"\s+", " ", text).strip()
        return text

    @classmethod
    def tokenize(cls, text, use_bigrams=True):
        normalized = cls.normalize_text(text)
        words = [w for w in normalized.split() if w not in STOPWORDS and len(w) > 1 or w in {"<url>", "<currency>", "<phone>", "<number>"}]

        tokens = list(words)
        if use_bigrams and len(words) > 1:
            for i in range(len(words) - 1):
                bigram = f"{words[i]}_{words[i+1]}"
                tokens.append(bigram)

        return tokens


if __name__ == "__main__":
    sample = "URGENT: Your SBI account has been blocked. Visit http://sbi-kyc.cc and enter OTP to claim Rs 5000 now!"
    print("Original:", sample)
    print("Normalized:", TextCleaner.normalize_text(sample))
    print("Tokens:", TextCleaner.tokenize(sample))
