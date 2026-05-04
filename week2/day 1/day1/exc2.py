# Exercise 1: Cats

class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age


def find_oldest_cat(cat1, cat2, cat3):
    oldest = cat1

    if cat2.age > oldest.age:
        oldest = cat2
    if cat3.age > oldest.age:
        oldest = cat3

    return oldest


cat1 = Cat("Whiskers", 3)
cat2 = Cat("Tom", 5)
cat3 = Cat("Garfield", 7)

oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")


# Exercise 2: Dogs

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")


davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Fluffy", 40)

for dog in [davids_dog, sarahs_dog]:
    print(f"{dog.name} is {dog.height} cm tall")
    dog.bark()
    dog.jump()
    print()

bigger_dog = davids_dog if davids_dog.height > sarahs_dog.height else sarahs_dog
print(f"{bigger_dog.name} is taller.")


# Exercise 3: Song

class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        print("\n".join(self.lyrics))


stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

stairway.sing_me_a_song()


# Exercise 4: Zoo

class Zoo:
    def __init__(self, name):
        self.name = name
        self.animals = []
        self.groups = {}

    def add_animal(self, *animals):
        for animal in animals:
            if animal not in self.animals:
                self.animals.append(animal)

    def get_animals(self):
        for animal in self.animals:
            print(animal)

    def sell_animal(self, animal):
        if animal in self.animals:
            self.animals.remove(animal)

    def sort_animals(self):
        self.animals.sort()
        grouped = {}

        for animal in self.animals:
            letter = animal[0].upper()
            grouped.setdefault(letter, []).append(animal)

        self.groups = grouped

    def get_groups(self):
        for letter, animals in self.groups.items():
            print(f"{letter}: {animals}")


zoo = Zoo("Safari Zoo")

zoo.add_animal("Giraffe", "Bear", "Baboon", "Lion", "Zebra", "Cat", "Cougar")
zoo.sell_animal("Bear")

zoo.sort_animals()
zoo.get_groups()