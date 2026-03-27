import json
import re
import random

# =========================
# Exercise 1: Valentine Menu
# =========================

VALENTINE_FILE = 'valentine_menu.json'

def initialize_valentine_menu():
    try:
        with open(VALENTINE_FILE, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {"valentine_items": []}
        with open(VALENTINE_FILE, 'w') as f:
            json.dump(data, f, indent=4)
    return data

def validate_item_name(name):
    # Must start with V
    if not name.startswith('V'):
        return False
    # Each word starts with uppercase or lowercase for connection words
    words = name.split()
    for w in words:
        if not re.match(r'^[A-Z][a-z-]*$|^(of|and|the)$', w):
            return False
    # Must contain at least 2 'e'
    if name.lower().count('e') < 2:
        return False
    # No numbers
    if re.search(r'\d', name):
        return False
    return True

def validate_price(price):
    # Pattern: XX,14
    return re.match(r'^\d{2},14$', price) is not None

def add_valentine_item():
    data = initialize_valentine_menu()
    name = input("Enter Valentine menu item name: ")
    price = input("Enter price (format XX,14): ")
    if validate_item_name(name) and validate_price(price):
        data['valentine_items'].append({"name": name, "price": price})
        with open(VALENTINE_FILE, 'w') as f:
            json.dump(data, f, indent=4)
        print("Item added successfully!")
    else:
        print("Invalid name or price!")

def display_heart():
    # Simple heart made of stars
    for y in range(6, -6, -1):
        line = ""
        for x in range(-7, 8):
            if (x*0.5)**2 + y**2 <= 9:
                line += "*"
            else:
                line += " "
        print(line)

def show_valentine_menu():
    data = initialize_valentine_menu()
    display_heart()
    print("\nValentine Menu:")
    for item in data.get("valentine_items", []):
        print(f"{item['name']} - {item['price']}")

# =========================
# Exercise 2: D&D Character Generator
# =========================

class Character:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.stats = self.generate_stats()

    def roll_stat(self):
        rolls = [random.randint(1,6) for _ in range(4)]
        rolls.remove(min(rolls))
        return sum(rolls)

    def generate_stats(self):
        abilities = ["Strength", "Dexterity", "Constitution",
                     "Intelligence", "Wisdom", "Charisma"]
        stats = {}
        for ability in abilities:
            stats[ability] = self.roll_stat()
        return stats

    def to_dict(self):
        return {"name": self.name, "age": self.age, "stats": self.stats}

class Game:
    def __init__(self):
        self.characters = []

    def create_characters(self):
        num_players = int(input("Enter number of players: "))
        for i in range(num_players):
            print(f"\nPlayer {i+1}:")
            name = input("Enter character name: ")
            age = int(input("Enter character age: "))
            char = Character(name, age)
            self.characters.append(char)

    def export_to_txt(self, filename="characters.txt"):
        with open(filename, 'w') as f:
            for c in self.characters:
                f.write(f"Name: {c.name}, Age: {c.age}\n")
                for stat, value in c.stats.items():
                    f.write(f"{stat}: {value}\n")
                f.write("\n")
        print(f"Characters saved to {filename}")

    def export_to_json(self, filename="characters.json"):
        with open(filename, 'w') as f:
            json.dump([c.to_dict() for c in self.characters], f, indent=4)
        print(f"Characters saved to {filename}")

# =========================
# Main Program
# =========================

def main():
    while True:
        print("\n1. Valentine Menu Manager")
        print("2. Dungeons & Dragons Character Generator")
        print("3. Show Valentine Menu")
        print("4. Exit")
        choice = input("Choose an option: ")
        if choice == '1':
            add_valentine_item()
        elif choice == '2':
            game = Game()
            game.create_characters()
            game.export_to_txt()
            game.export_to_json()
        elif choice == '3':
            show_valentine_menu()
        elif choice == '4':
            print("Exiting program...")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()