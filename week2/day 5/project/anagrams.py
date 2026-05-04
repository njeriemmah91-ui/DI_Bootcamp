# anagrams.py

from anagram_checker import AnagramChecker

def main():
    # Create an instance of AnagramChecker using sowpod.txt
    checker = AnagramChecker("sowpods.txt")

    # If the word list failed to load, exit
    if not checker.word_list:
        print("Word list is empty or missing. Exiting program.")
        return

    while True:
        # Show menu
        print("\n=== Anagram Checker Menu ===")
        print("1. Enter a word")
        print("2. Exit")
        choice = input("Choose an option (1 or 2): ").strip()

        if choice == "2":
            print("Goodbye!")
            break
        elif choice == "1":
            user_input = input("Enter a single word: ").strip()

            # Validate input: must be a single alphabetic word
            if " " in user_input or not user_input.isalpha():
                print("Invalid input. Please enter a single word with letters only.")
                continue

            word_upper = user_input.upper()  # For display
            is_valid = checker.is_valid_word(user_input)
            anagrams = checker.get_anagrams(user_input)

            # Display results
            print(f"\nYOUR WORD: \"{word_upper}\"")
            print(f"This is a {'valid' if is_valid else 'invalid'} English word.")
            if anagrams:
                print("Anagrams for your word:", ", ".join(anagrams))
            else:
                print("No anagrams found for your word.")
        else:
            print("Invalid option. Choose 1 or 2.")

if __name__ == "__main__":
    main()