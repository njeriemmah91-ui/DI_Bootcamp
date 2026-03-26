from datetime import date
import holidays
import re
import random
import string


def upcoming_holiday():
    # Displays today's date and next holiday
    today = date.today()
    print(f"Today's date: {today}")

    ke_holidays = holidays.Kenya(years=today.year)
    upcoming = [(d, n) for d, n in ke_holidays.items() if d >= today]

    if not upcoming:
        ke_holidays = holidays.Kenya(years=today.year + 1)
        upcoming = list(ke_holidays.items())

    next_holiday_date, next_holiday_name = min(upcoming)
    days_left = (next_holiday_date - today).days

    print(f"The next holiday is {next_holiday_name} in {days_left} days.\n")


def age_on_planets(seconds):
    # Converts age in seconds to planetary years
    earth_year = 31557600

    planets = {
        "Earth": 1,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132
    }

    for planet, ratio in planets.items():
        age = seconds / (earth_year * ratio)
        print(f"{planet}: {round(age, 2)} years")


def return_numbers(text):
    # Extracts numbers from a string
    return ''.join(re.findall(r'\d', text))


def validate_name():
    # Validates full name format
    name = input("Enter your full name: ")
    if re.fullmatch(r'[A-Z][a-z]+ [A-Z][a-z]+', name):
        print("Valid name")
    else:
        print("Invalid name")


def is_valid_password(password, length):
    # Checks password validity rules
    return (
        len(password) == length and
        any(c.isdigit() for c in password) and
        any(c.islower() for c in password) and
        any(c.isupper() for c in password) and
        any(c in string.punctuation for c in password)
    )


def generate_password(length):
    # Generates a valid password
    chars = string.ascii_letters + string.digits + string.punctuation
    while True:
        password = ''.join(random.choice(chars) for _ in range(length))
        if is_valid_password(password, length):
            return password


def password_program():
    # Handles user input and password generation
    while True:
        try:
            length = int(input("Enter password length (6-30): "))
            if 6 <= length <= 30:
                break
        except ValueError:
            pass

    password = generate_password(length)
    print(password)


def test_passwords():
    # Tests password generator 100 times
    for _ in range(100):
        length = random.randint(6, 30)
        pwd = generate_password(length)
        assert is_valid_password(pwd, length)


if __name__ == "__main__":
    upcoming_holiday()
    age_on_planets(1000000000)
    print(return_numbers('k5k3q2g5z6x9bn'))
    # validate_name()
    # password_program()
    test_passwords()