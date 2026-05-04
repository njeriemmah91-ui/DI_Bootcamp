# anagram_checker.py

class AnagramChecker:
    def __init__(self, word_file):
        """
        Load the word list file into a set for fast lookup.
        Converts all words to lowercase for case-insensitive comparison.
        """
        try:
            with open(word_file, "r") as f:
                self.word_list = set(word.strip().lower() for word in f.readlines())
        except FileNotFoundError:
            print(f"Error: {word_file} not found.")
            self.word_list = set()

    def is_valid_word(self, word):
        """
        Returns True if the word exists in the word list.
        """
        return word.lower() in self.word_list

    def is_anagram(self, word1, word2):
        """
        Returns True if word1 and word2 are anagrams (same letters, not identical).
        """
        w1 = word1.lower()
        w2 = word2.lower()
        return w1 != w2 and sorted(w1) == sorted(w2)

    def get_anagrams(self, word):
        """
        Returns a list of all anagrams of the given word from the word list.
        """
        word_lower = word.lower()
        return [w for w in self.word_list if self.is_anagram(word_lower, w)]