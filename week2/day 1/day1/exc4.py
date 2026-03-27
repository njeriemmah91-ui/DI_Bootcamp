# Old MacDonald’s Farm

class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        # Single animal
        if animal_type:
            if animal_type in self.animals:
                self.animals[animal_type] += count
            else:
                self.animals[animal_type] = count

        # Multiple animals (bonus)
        for animal, qty in kwargs.items():
            if animal in self.animals:
                self.animals[animal] += qty
            else:
                self.animals[animal] = qty

    def get_info(self):
        output = f"{self.name}'s farm\n\n"

        for animal, count in self.animals.items():
            output += f"{animal} : {count}\n"

        output += "\n    E-I-E-I-0!"
        return output

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animal_list = self.get_animal_types()

        formatted = []
        for animal in animal_list:
            if self.animals[animal] > 1:
                formatted.append(animal + "s")
            else:
                formatted.append(animal)

        if len(formatted) > 1:
            animals_str = ", ".join(formatted[:-1]) + " and " + formatted[-1]
        else:
            animals_str = formatted[0]

        return f"{self.name}'s farm has {animals_str}."


# Test

macdonald = Farm("McDonald")

macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal(goat=12)  # kwargs version

print(macdonald.get_info())

print()
print(macdonald.get_animal_types())

print()
print(macdonald.get_short_info())