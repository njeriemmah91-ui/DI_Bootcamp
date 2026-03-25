import random

# ================================
# Exercise 1: Full Name Function
# ================================
def get_full_name(first_name, last_name, middle_name=None):
    if middle_name:
        return f"{first_name.capitalize()} {middle_name.capitalize()} {last_name.capitalize()}"
    else:
        return f"{first_name.capitalize()} {last_name.capitalize()}"

print("Exercise 1:")
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))
print()


# ================================
# Exercise 2: English ↔ Morse Code
# ================================
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.'
}

MORSE_REVERSE_DICT = {value: key for key, value in MORSE_CODE_DICT.items()}

def text_to_morse(text):
    result = []
    for word in text.upper().split():
        letters = []
        for char in word:
            if char in MORSE_CODE_DICT:
                letters.append(MORSE_CODE_DICT[char])
        result.append(" ".join(letters))
    return " / ".join(result)

def morse_to_text(morse):
    words = morse.split(" / ")
    decoded = []

    for word in words:
        letters = word.split()
        decoded_letters = [MORSE_REVERSE_DICT[l] for l in letters if l in MORSE_REVERSE_DICT]
        decoded.append("".join(decoded_letters))

    return " ".join(decoded)

print("Exercise 2:")
sample = "HELLO"
morse = text_to_morse(sample)
print("Text to Morse:", morse)
print("Morse to Text:", morse_to_text(morse))
print()


# ================================
# Exercise 3: Box Printer
# ================================
def box_printer(*args):
    max_length = max(len(word) for word in args)

    border = "*" * (max_length + 4)
    print(border)

    for word in args:
        print(f"* {word.ljust(max_length)} *")

    print(border)

print("Exercise 3:")
box_printer("Hello", "World", "in", "reallylongword", "a", "frame")
print()


# ================================
# Exercise 4: Insertion Sort
# ================================
def insertion_sort(alist):
    for index in range(1, len(alist)):
        currentvalue = alist[index]
        position = index

        while position > 0 and alist[position - 1] > currentvalue:
            alist[position] = alist[position - 1]
            position = position - 1

        alist[position] = currentvalue

alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]

insertion_sort(alist)

print("Exercise 4:")
print(alist)