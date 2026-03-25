# Ask user for a word
word = input("Enter a word: ")

# Create dictionary
letter_dict = {}

# Loop through the word with index
for index, letter in enumerate(word):
    if letter in letter_dict:
        letter_dict[letter].append(index)
    else:
        letter_dict[letter] = [index]

# Print result
print(letter_dict)