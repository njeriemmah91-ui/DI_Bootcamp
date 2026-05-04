import math

# ---------------- FUNCTIONS ---------------- #

def exercise1():
    lst = [1, 2, 3, 4]
    index = int(input("Enter index: "))
    item = input("Enter item: ")
    lst.insert(index, item)
    print(lst)

def exercise2():
    text = input("Enter a string: ")
    count = 0
    for char in text:
        if char == " ":
            count += 1
    print("Spaces:", count)

def exercise3():
    text = input("Enter a string: ")
    upper = 0
    lower = 0
    for char in text:
        if char.isupper():
            upper += 1
        elif char.islower():
            lower += 1
    print("Upper:", upper, "Lower:", lower)

def exercise4():
    arr = list(map(int, input("Enter numbers: ").split()))
    total = 0
    for num in arr:
        total += num
    print("Sum:", total)

def exercise5():
    lst = list(map(int, input("Enter numbers: ").split()))
    max_num = lst[0]
    for num in lst:
        if num > max_num:
            max_num = num
    print("Max:", max_num)

def exercise6():
    n = int(input("Enter number: "))
    result = 1
    for i in range(1, n+1):
        result *= i
    print("Factorial:", result)

def exercise7():
    lst = input("Enter list items: ").split()
    element = input("Enter element: ")
    count = 0
    for item in lst:
        if item == element:
            count += 1
    print("Count:", count)

def exercise8():
    lst = list(map(int, input("Enter numbers: ").split()))
    total = 0
    for num in lst:
        total += num**2
    print("Norm:", math.sqrt(total))

def exercise9():
    lst = list(map(int, input("Enter numbers: ").split()))
    if lst == sorted(lst) or lst == sorted(lst, reverse=True):
        print("True")
    else:
        print("False")

def exercise10():
    words = input("Enter words: ").split()
    longest = words[0]
    for word in words:
        if len(word) > len(longest):
            longest = word
    print("Longest word:", longest)

def exercise11():
    lst = input("Enter mixed values: ").split()
    ints = []
    strings = []
    for item in lst:
        if item.isdigit():
            ints.append(int(item))
        else:
            strings.append(item)
    print("Integers:", ints)
    print("Strings:", strings)

def exercise12():
    s = input("Enter string: ")
    if s == s[::-1]:
        print("True")
    else:
        print("False")

def exercise13():
    sentence = input("Enter sentence: ")
    k = int(input("Enter k: "))
    words = sentence.split()
    count = 0
    for word in words:
        if len(word) > k:
            count += 1
    print("Count:", count)

def exercise14():
    d = {'a':1,'b':2,'c':8,'d':1}
    total = 0
    count = 0
    for val in d.values():
        total += val
        count += 1
    print("Average:", total/count)

def exercise15():
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    divisors = []
    for i in range(1, min(a,b)+1):
        if a%i==0 and b%i==0:
            divisors.append(i)
    print(divisors)

def exercise16():
    n = int(input("Enter number: "))
    if n < 2:
        print("False")
        return
    for i in range(2, n):
        if n % i == 0:
            print("False")
            return
    print("True")

def exercise17():
    lst = list(map(int, input("Enter numbers: ").split()))
    result = []
    for i in range(len(lst)):
        if i % 2 == 0 and lst[i] % 2 == 0:
            result.append(lst[i])
    print(result)

def exercise18():
    data = {"a":1,"b":"string","c":1.0,"d":True,"e":False}
    types = {}
    for value in data.values():
        t = type(value).__name__
        if t in types:
            types[t] += 1
        else:
            types[t] = 1
    print(types)

def exercise19():
    s = input("Enter string: ")
    sep = input("Enter separator (default space): ")
    if sep == "":
        sep = " "
    result = []
    word = ""
    for char in s:
        if char == sep:
            result.append(word)
            word = ""
        else:
            word += char
    result.append(word)
    print(result)

def exercise20():
    s = input("Enter password string: ")
    password = ""
    for char in s:
        if char.lower() in "aeiou":
            password += "*"
        else:
            password += char
    print(password)

# ---------------- MENU ---------------- #

while True:
    print("\n--- MENU ---")
    print("1 to 20 for exercises")
    print("0 to exit")

    choice = input("Choose exercise: ")

    if choice == "1": exercise1()
    elif choice == "2": exercise2()
    elif choice == "3": exercise3()
    elif choice == "4": exercise4()
    elif choice == "5": exercise5()
    elif choice == "6": exercise6()
    elif choice == "7": exercise7()
    elif choice == "8": exercise8()
    elif choice == "9": exercise9()
    elif choice == "10": exercise10()
    elif choice == "11": exercise11()
    elif choice == "12": exercise12()
    elif choice == "13": exercise13()
    elif choice == "14": exercise14()
    elif choice == "15": exercise15()
    elif choice == "16": exercise16()
    elif choice == "17": exercise17()
    elif choice == "18": exercise18()
    elif choice == "19": exercise19()
    elif choice == "20": exercise20()
    elif choice == "0":
        print("Goodbye!")
        break
    else:
        print("Invalid choice!")
