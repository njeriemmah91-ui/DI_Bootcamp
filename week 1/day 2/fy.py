keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Using zip
my_dict = dict(zip(keys, values))
print(my_dict)
family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}
total_cost = 0

for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    print(f"{name.title()} ticket price: ${price}")
    total_cost += price

print(f"Total cost: ${total_cost}")
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {"France": "blue", "Spain": "red", "US": ["pink", "green"]}
}

# Modify number of stores
brand["number_stores"] = 2

# Print type of clothes sentence
print(f"Zara sells clothes for {', '.join(brand['type_of_clothes'])}.")

# Add country_creation
brand["country_creation"] = "Spain"

# Add Desigual to competitors if key exists
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# Delete creation_date
brand.pop("creation_date", None)

# Print last item in international competitors
print("Last international competitor:", brand["international_competitors"][-1])

# Print major colors in the US
print("US major colors:", brand["major_color"]["US"])

# Print number of keys
print("Number of keys:", len(brand))

# Print all keys
print("All keys:", list(brand.keys()))

# Bonus: merge with more_on_zara
more_on_zara = {"creation_date": 1975, "number_stores": 10000}
brand.update(more_on_zara)
print("Merged brand dictionary:", brand)
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Characters to indices
char_to_index = {char: idx for idx, char in enumerate(users)}
print("Character -> index:", char_to_index)

# 2. Indices to characters
index_to_char = {idx: char for idx, char in enumerate(users)}
print("Index -> character:", index_to_char)

# 3. Alphabetically sorted characters -> indices
sorted_chars = sorted(users)
sorted_dict = {char: idx for idx, char in enumerate(sorted_chars)}
print("Alphabetical -> index:", sorted_dict)