# Challenge 1: Sorting comma-separated words

user_input = input("Enter words separated by commas: ")

# Split the input string into a list
words = user_input.split(",")

# Sort the list alphabetically
words.sort()

# Join the sorted list back into a comma-separated string
sorted_words = ",".join(words)

# Print the result
print(sorted_words)


# Challenge 2: Longest word in a sentence

def longest_word(sentence):
    # Split the sentence into a list of words
    words = sentence.split()

    # Initialize the longest word as the first word
    longest = words[0]

    # Loop through each word
    for word in words:
        # Compare lengths
        if len(word) > len(longest):
            longest = word

    # Return the longest word found
    return longest


# Example usage
print(longest_word("Margaret's toy is a pretty doll."))
print(longest_word("A thing of beauty is a joy forever."))
print(longest_word("Forgetfulness is by all means powerless!"))