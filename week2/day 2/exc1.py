import random

# -------------------- Dog Class --------------------
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"


# -------------------- PetDog Class --------------------
class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        names = [self.name]
        for dog in args:
            names.append(dog.name)
        print(f"{', '.join(names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll",
                "stands on his back legs",
                "shakes your hand",
                "plays dead"
            ]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} is not trained yet.")


# -------------------- Person Class --------------------
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18


# -------------------- Family Class --------------------
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age)
        person.last_name = self.last_name
        self.members.append(person)

    def check_majority(self, first_name):
        for person in self.members:
            if person.first_name == first_name:
                if person.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return
        print("Person not found.")

    def family_presentation(self):
        print(f"Family name: {self.last_name}")
        for person in self.members:
            print(f"{person.first_name}, Age: {person.age}")


# -------------------- TESTING --------------------
# PetDog Test
dog1 = PetDog("Fido", 2, 10)
dog2 = PetDog("Buddy", 3, 12)
dog3 = PetDog("Max", 1, 8)

dog1.train()
dog1.play(dog2, dog3)
dog1.do_a_trick()

print("\n--------------------\n")

# Family Test
my_family = Family("Smith")

my_family.born("John", 40)
my_family.born("Jane", 38)
my_family.born("Emma", 17)

my_family.family_presentation()

my_family.check_majority("Emma")
my_family.check_majority("John")