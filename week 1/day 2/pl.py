# 1. Declare a variable called first and assign it to "Hello World"
first = "Hello World"

# 2. This is a comment.

# 3. Log a message to the terminal
print("I AM A COMPUTER!")

# 4. If statement that checks the conditions
if 1 < 2 and 4 > 2:
    print("Math is fun.")

# 5. Assign a variable called nope to an absence of value
nope = None

# 6. Use the “and” boolean operator to combine true and false
boolean_result = True and False
print(boolean_result)  # False

# 7. Calculate the length of the string "What's my length?"
length = len("What's my length?")
print(length)  # 17

# 8. Convert the string "i am shouting" to uppercase
shouting = "i am shouting".upper()
print(shouting)  # I AM SHOUTING

# 9. Convert the string "1000" to the number 1000
number = int("1000")
print(number)  # 1000

# 10. Combine the number 4 with the string "real" to produce "4real"
combined = str(4) + "real"
print(combined)  # 4real

# 11. Record the output of the expression 3 * "cool"
cool_output = 3 * "cool"
print(cool_output)  # coolcoolcool

# 12. Record the output of the expression 1 / 0
try:
    error_output = 1 / 0
except ZeroDivisionError as e:
    print("Error:", e)

# 13. Determine the type of []
list_type = type([])
print(list_type)  # <class 'list'>

# 14. Ask the user for their name
name = input("What is your name? ")

# 15. Ask the user for a number and check if it’s negative, positive, or zero
num = float(input("Enter a number: "))

if num < 0:
    print("That number is less than 0!")
elif num > 0:
    print("That number is greater than 0!")
else:
    print("You picked 0!")

# 16. Find the index of "l" in "apple"
index_l = "apple".index("l")
print(index_l)  # 3

# 17. Check whether "y" is in "xylophone"
contains_y = "y" in "xylophone"
print(contains_y)  # True

# 18. Check whether a string called my_string is all in lowercase
my_string = "example"
is_lowercase = my_string.islower()
print(is_lowercase)  # True
# ----------------------
#  Hello World
# ----------------------
print("Hello world\nHello world\nHello world\nHello world")


# ----------------------
#  Some Math
# ----------------------
result = (99 ** 3) * 8
print(result)


# ----------------------
# What is the output?
# ----------------------
# Predictions (comments), then actual results

print(15 < 8)        
print(5 < 3)      
print(3 == 3)        
print(3 == "3")      
# print("3" > 3)     
print("Hello" == "hello")  


# ----------------------
#  Your computer brand
# ----------------------
computer_brand = "HP"  
print(f"I have a {computer_brand} computer.")

# ----------------------
name = "Emmah"      
age = 18              
shoe_size = 36        

info = f"My name is {name}, I am {age} years old and my shoe size is {shoe_size}. I love coding!"
print(info)


# ----------------------
# A & B
# ----------------------
a = 10
b = 5

if a > b:
    print("Hello World")


# ----------------------
#  Odd or Even
# ----------------------
num = int(input("Enter a number: "))

if num % 2 == 0:
    print("Even number")
else:
    print("Odd number")


# ----------------------
#  What’s your name?
# ----------------------
my_name = "Emmah"  # your name
user_name = input("What is your name? ")

if user_name.lower() == my_name.lower():
    print("Wow! We have the same name ")
else:
    print("Nice to meet you, " + user_name)
# ----------------------
height = int(input("Enter your height in cm: "))

if height > 145:
    print("You are tall enough to ride 🎢")
else:
    print("You need to grow some more to ride.")