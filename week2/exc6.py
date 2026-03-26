# Collects user input, stores tuples, and sorts using lambda

data = []

for _ in range(5):
    name = input("Enter name: ")
    age = input("Enter age: ")
    score = input("Enter score: ")
    data.append((name, age, score))

data.sort(key=lambda x: (x[0], int(x[1]), int(x[2])))

print(data)