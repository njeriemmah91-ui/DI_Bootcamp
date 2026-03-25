# Initialize dictionary with birthdays
birthdays = {
    "Alice": "2000/05/14",
    "Bob": "1998/11/22",
    "Charlie": "2002/07/03",
    "Dana": "1999/12/19",
    "Eli": "2001/09/30"
}

# Welcome message
print("Welcome! You can look up the birthdays of the people in the list!")

# Ask user for a name
name = input("Enter a person's name: ")

# Get birthday
birthday = birthdays.get(name)
if birthday:
    print(f"{name}'s birthday is on {birthday}.")
else:
    print(f"Sorry, {name}'s birthday is not in the list.")