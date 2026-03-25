# Original string
cars = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# Convert string to list
car_list = cars.split(", ")

# Print number of manufacturers
print(f"There are {len(car_list)} manufacturers in the list.")

# Print list in reverse alphabetical order (Z-A)
print("Manufacturers in descending order:")
print(sorted(car_list, reverse=True))

# Count names containing 'o'
count_o = sum(1 for car in car_list if 'o' in car.lower())
print(f"Manufacturers with 'o': {count_o}")

# Count names NOT containing 'i'
count_no_i = sum(1 for car in car_list if 'i' not in car.lower())
print(f"Manufacturers without 'i': {count_no_i}")