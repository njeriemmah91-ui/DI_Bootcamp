import random

# Generate the list of random numbers
list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]

# Target number
target_number = 3728

# Use a set to track seen numbers
seen = set()

# Store pairs
pairs = set()

# Find pairs that sum to the target
for num in list_of_numbers:
    complement = target_number - num

    if complement in seen:
        # Store pairs in sorted order to avoid duplicates like (a,b) and (b,a)
        pair = tuple(sorted((num, complement)))
        pairs.add(pair)

    seen.add(num)

# Print all unique pairs
for pair in pairs:
    print(pair[0], "and", pair[1], "sum to", target_number)