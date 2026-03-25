# Patterns

rows = 3
for i in range(rows):
    spaces = " " * (rows - i - 1)
    stars = "*" * (2 * i + 1)
    print(spaces + stars)

print()

rows = 5
for i in range(rows):
    spaces = " " * (rows - i - 1)
    stars = "*" * (i + 1)
    print(spaces + stars)

print()

rows = 5

for i in range(1, rows + 1):
    print("*" * i)

for i in range(rows - 1, 0, -1):
    print("*" * i)

print()

my_list = [2, 24, 12, 354, 233]

for i in range(len(my_list) - 1):
    minimum = i

    for j in range(i + 1, len(my_list)):
        if my_list[j] < my_list[minimum]:
            minimum = j

    if minimum != i:
        my_list[i], my_list[minimum] = my_list[minimum], my_list[i]

print(my_list)