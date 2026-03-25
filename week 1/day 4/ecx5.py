# Coffee Shop Menu Manager

# Initial data
menu = {
    "espresso": 7.0,
    "latte": 12.0,
    "cappuccino": 10.0
}

# -----------------------------
# a) Show menu
# -----------------------------
def show_menu(menu_dict):
    if not menu_dict:
        print("The menu is empty.")
    else:
        print("Current menu:")
        for drink, price in menu_dict.items():
            print(f"{drink} - {price}₪")


# -----------------------------
# b) Add item
# -----------------------------
def add_item(menu_dict):
    drink = input("Enter new drink name: ").lower()

    if drink in menu_dict:
        print("Item already exists!")
    else:
        try:
            price = float(input("Enter price: "))
            if price < 0:
                print("Invalid price.")
                return
            menu_dict[drink] = price
            print(f'"{drink}" added!')
        except ValueError:
            print("Invalid input.")


# -----------------------------
# c) Update price
# -----------------------------
def update_price(menu_dict):
    drink = input("Which drink do you want to update? ").lower()

    if drink in menu_dict:
        try:
            new_price = float(input("Enter the new price: "))
            if new_price < 0:
                print("Invalid price.")
                return
            menu_dict[drink] = new_price
            print("Price updated!")
        except ValueError:
            print("Invalid input.")
    else:
        print("Item not found.")


# -----------------------------
# d) Delete item
# -----------------------------
def delete_item(menu_dict):
    drink = input("Which drink do you want to delete? ").lower()

    if drink in menu_dict:
        del menu_dict[drink]
        print("Item deleted.")
    else:
        print("Item not found.")


# -----------------------------
# e) Show options
# -----------------------------
def show_options():
    print("\nWhat would you like to do?")
    print("1. Show menu")
    print("2. Add item")
    print("3. Update price")
    print("4. Delete item")
    print("5. Exit")


# -----------------------------
# f) Main controller
# -----------------------------
def run_coffee_shop():
    while True:
        show_options()
        choice = input("> ")

        if choice == "1":
            show_menu(menu)

        elif choice == "2":
            add_item(menu)

        elif choice == "3":
            update_price(menu)

        elif choice == "4":
            delete_item(menu)

        elif choice == "5":
            print("Goodbye!")
            break

        else:
            print("Invalid choice, try again.")


# Start the program
run_coffee_shop()