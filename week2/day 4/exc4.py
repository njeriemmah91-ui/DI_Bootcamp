import string
import re
from collections import Counter

# =========================
# Part I & II: Text Analysis
# =========================

class Text:
    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        words = self.text.split()
        count = sum(1 for w in words if w.lower() == word.lower())
        if count == 0:
            return f"The word '{word}' was not found."
        return count

    def most_common_word(self):
        words = self.text.split()
        if not words:
            return "No words in text."
        freq = Counter([w.lower() for w in words])
        most_common = freq.most_common(1)[0]
        return most_common[0]

    def unique_words(self):
        words = self.text.split()
        unique = set([w.lower() for w in words])
        return list(unique)

    @classmethod
    def from_file(cls, file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return cls(content)

# =========================
# Bonus: Text Modification
# =========================

class TextModification(Text):
    def remove_punctuation(self):
        translator = str.maketrans('', '', string.punctuation)
        modified_text = self.text.translate(translator)
        return modified_text

    def remove_stop_words(self):
        stop_words = {
            'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
            'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of',
            'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with'
        }
        words = self.text.split()
        filtered_words = [w for w in words if w.lower() not in stop_words]
        return ' '.join(filtered_words)

    def remove_special_characters(self):
        modified_text = re.sub(r'[^A-Za-z0-9\s]', '', self.text)
        return modified_text

# =========================
# Example Usage
# =========================

if __name__ == "__main__":
    sample_text = "Hello! This is a simple example. The purpose is to test, test, and test again."

    # Text analysis
    text_obj = Text(sample_text)
    print("Word frequency of 'test':", text_obj.word_frequency('test'))
    print("Most common word:", text_obj.most_common_word())
    print("Unique words:", text_obj.unique_words())

    

    # Text modification
    mod_obj = TextModification(sample_text)
    print("Without punctuation:", mod_obj.remove_punctuation())
    print("Without stop words:", mod_obj.remove_stop_words())
    print("Without special characters:", mod_obj.remove_special_characters())