def get_age(year, month, day):
    # Hard-coded current date
    current_year = 2026
    current_month = 3

    age = current_year - year

    # Adjust if birthday hasn't happened yet this year
    if month > current_month:
        age -= 1

    return age


def can_retire(gender, date_of_birth):
    # Split the date string
    year, month, day = map(int, date_of_birth.split("/"))

    age = get_age(year, month, day)

    if gender.lower() == "m":
        return age >= 67
    elif gender.lower() == "f":
        return age >= 62
    else:
        return False


# User input
gender = input("Enter your gender (m/f): ")
dob = input("Enter your date of birth (yyyy/mm/dd): ")

if can_retire(gender, dob):
    print("You can retire 🎉")
else:
    print("You cannot retire yet.")