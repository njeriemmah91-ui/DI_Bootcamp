# Exercise 1: Geometry

import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * self.radius ** 2

    def definition(self):
        print("A circle is a shape consisting of all points in a plane that are at a given distance from a given point (the center).")


circle = Circle(5)
print("Perimeter:", circle.perimeter())
print("Area:", circle.area())
circle.definition()


# Exercise 2: Custom List Class

import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def random_numbers(self):
        return [random.randint(0, 100) for _ in range(len(self.letters))]


my_list = MyList(['b', 'a', 'd', 'c'])

print("Original:", my_list.letters)
print("Reversed:", my_list.reversed_list())
print("Sorted:", my_list.sorted_list())
print("Random list:", my_list.random_numbers())


# Exercise 3: Restaurant Menu Manager

class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten
        })

    def update_item(self, name, price, spice, gluten):
        for item in self.menu:
            if item["name"] == name:
                item["price"] = price
                item["spice"] = spice
                item["gluten"] = gluten
                return
        print("Item not found.")

    def remove_item(self, name):
        for item in self.menu:
            if item["name"] == name:
                self.menu.remove(item)
                print(self.menu)
                return
        print("Item not found.")


manager = MenuManager()

manager.add_item("Pizza", 20, "A", True)
manager.update_item("Soup", 12, "C", False)
manager.remove_item("Salad")