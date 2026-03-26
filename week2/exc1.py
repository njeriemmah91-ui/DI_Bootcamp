# Exercise 1: Currency Class
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}s"

    def __repr__(self):
        return f"{self.amount} {self.currency}s"

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, int):
            return self.amount + other
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type <{self.currency}> and <{other.currency}>"
                )
            return self.amount + other.amount
        raise TypeError("Unsupported type for addition")

    def __iadd__(self, other):
        if isinstance(other, int):
            self.amount += other
            return self
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type <{self.currency}> and <{other.currency}>"
                )
            self.amount += other.amount
            return self
        raise TypeError("Unsupported type for addition")

c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)

print(c1)
print(int(c1))
print(repr(c1))
print(c1 + 5)
print(c1 + c2)
c1 += 5
print(c1)
c1 += c2
print(c1)
# print(c1 + c3)

# Exercise 2: Function Import
def add_numbers(a, b):
    print(a + b)

add_numbers(5, 10)

# Exercise 3: Random String
import string
import random

def random_string(length=5):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for _ in range(length))

print(random_string())

# Exercise 4: Current Date
from datetime import datetime

def current_date():
    today = datetime.now()
    print(today.strftime("%Y-%m-%d"))

current_date()

# Exercise 5: Time Until January 1st
def time_until_new_year():
    now = datetime.now()
    next_year = datetime(now.year + 1, 1, 1)
    difference = next_year - now
    print(difference)

time_until_new_year()

# Exercise 6: Minutes Lived
def minutes_lived(birthdate_str):
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    now = datetime.now()
    difference = now - birthdate
    minutes = int(difference.total_seconds() / 60)
    print(minutes)

minutes_lived("2000-01-01")

# Exercise 7: Faker Module
from faker import Faker
fake = Faker()
users = []

def generate_users(n):
    for _ in range(n):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user)

generate_users(5)
for user in users:
    print(user)