# ----------------------
# Exercise 1
# ----------------------
list1 = [1, 2, 3]
list2 = [4, 5, 6]

list1.extend(list2)
print(list1)


# ----------------------
# Exercise 2
# ----------------------
for num in range(1500, 2501):
    if num % 5 == 0 and num % 7 == 0:
        print(num)


# ----------------------
# Exercise 3
# ----------------------
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

user_name = input("Enter a name: ")

if user_name in names:
    print(names.index(user_name))
else:
    print("Name not found")


# ----------------------
# Exercise 4
# ----------------------
num1 = int(input("Input the 1st number: "))
num2 = int(input("Input the 2nd number: "))
num3 = int(input("Input the 3rd number: "))

if num1 >= num2 and num1 >= num3:
    print("The greatest number is:", num1)
elif num2 >= num1 and num2 >= num3:
    print("The greatest number is:", num2)
else:
    print("The greatest number is:", num3)


# ----------------------
# Exercise 5
# ----------------------
alphabet = "abcdefghijklmnopqrstuvwxyz"

for letter in alphabet:
    if letter in "aeiou":
        print(letter + " is a vowel")
    else:
        print(letter + " is a consonant")


# ----------------------
# Exercise 6
# ----------------------
words = []

for i in range(7):
    word = input("Enter a word: ")
    words.append(word)

letter = input("Enter a letter: ")

for word in words:
    if letter in word:
        print(word.index(letter))
    else:
        print("Letter not found in " + word)


# ----------------------
# Exercise 7
# ----------------------
numbers = list(range(1, 1000001))

print(min(numbers))
print(max(numbers))
print(sum(numbers))


# ----------------------
# Exercise 8
# ----------------------
user_input = input("Enter numbers separated by commas: ")

numbers_list = user_input.split(",")
numbers_tuple = tuple(numbers_list)

print(numbers_list)
print(numbers_tuple)


# ----------------------
# Exercise 9
# ----------------------
import random

wins = 0
losses = 0

while True:
    user_input = input("Guess a number (1-9) or 'q' to quit: ")

    if user_input == 'q':
        break

    guess = int(user_input)
    random_number = random.randint(1, 9)

    if guess == random_number:
        print("Winner")
        wins += 1
    else:
        print("Better luck next time")
        losses += 1

print("Games won:", wins)
print("Games lost:", losses)