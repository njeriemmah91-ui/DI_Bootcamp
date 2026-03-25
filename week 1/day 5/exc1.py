import random

# Word list
wordslist = [
    'correction', 'childish', 'beach', 'python', 'assertive',
    'interference', 'complete', 'share', 'credit card', 'rush', 'south'
]

# Choose random word
word = random.choice(wordslist).lower()

# Create display (underscores + spaces)
display = []
for char in word:
    if char == " ":
        display.append(" ")
    else:
        display.append("_")

guessed_letters = []
wrong_guesses = 0
max_wrong = 6

# Function to show game state
def show_game():
    print("\nWord:", " ".join(display))
    print("Guessed letters:", guessed_letters)
    print("Wrong guesses:", wrong_guesses, "/", max_wrong)

# Function to update display
def update_word(letter):
    for i in range(len(word)):
        if word[i] == letter:
            display[i] = letter

# Game loop
while wrong_guesses < max_wrong and "_" in display:
    show_game()
    
    guess = input("Guess a letter: ").lower()

    # Validate input
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter ONE valid letter.")
        continue

    # Check if already guessed
    if guess in guessed_letters:
        print("You already guessed that letter!")
        continue

    guessed_letters.append(guess)

    # Check guess
    if guess in word:
        print("Correct!")
        update_word(guess)
    else:
        print("Wrong!")
        wrong_guesses += 1

# End of game
show_game()

if "_" not in display:
    print("\n🎉 You won!")
else:
    print("\n💀 You lost! The word was:", word)