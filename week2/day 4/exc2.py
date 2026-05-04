import json
import requests

# =========================
# Exercise 1: Menu Manager
# =========================
class MenuManager:
    def __init__(self, file_path='restaurant_menu.json'):
        self.file_path = file_path
        try:
            with open(file_path, 'r') as f:
                self.menu = json.load(f)
        except FileNotFoundError:
            self.menu = {"items": []}

    def add_item(self, name, price):
        self.menu['items'].append({'name': name, 'price': price})

    def remove_item(self, name):
        for i, item in enumerate(self.menu['items']):
            if item['name'].lower() == name.lower():
                del self.menu['items'][i]
                return True
        return False

    def save_to_file(self):
        with open(self.file_path, 'w') as f:
            json.dump(self.menu, f, indent=4)

def show_restaurant_menu(manager):
    print("\nRestaurant Menu:")
    for item in manager.menu['items']:
        print(f"{item['name']} - ${item['price']}")

def add_item_ui(manager):
    name = input("Enter item name: ")
    price = float(input("Enter item price: "))
    manager.add_item(name, price)
    print(f"{name} added successfully!")

def remove_item_ui(manager):
    name = input("Enter item name to remove: ")
    if manager.remove_item(name):
        print(f"{name} removed successfully!")
    else:
        print("Item not found!")

def menu_interface():
    manager = MenuManager()
    while True:
        print("\n1. Show Menu\n2. Add Item\n3. Remove Item\n4. Exit Menu Manager")
        choice = input("Choose an option: ")
        if choice == '1':
            show_restaurant_menu(manager)
        elif choice == '2':
            add_item_ui(manager)
        elif choice == '3':
            remove_item_ui(manager)
        elif choice == '4':
            manager.save_to_file()
            print("Menu saved. Exiting...")
            break
        else:
            print("Invalid choice.")

# =========================
# Exercise 2: Giphy API #1
# =========================
def giphy_fixed_search():
    API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    SEARCH_TERM = "hilarious"
    RATING = "g"
    url = f"https://api.giphy.com/v1/gifs/search?q={SEARCH_TERM}&rating={RATING}&api_key={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()['data']
        filtered_gifs = [gif for gif in data if int(gif['images']['original']['height']) > 100]
        first_10_gifs = filtered_gifs[:10]
        print(f"\nNumber of gifs received: {len(filtered_gifs)}")
        print("First 10 GIF URLs:")
        for gif in first_10_gifs:
            print(gif['url'])
    else:
        print("Failed to fetch GIFs")

# =========================
# Exercise 3: Giphy API #2
# =========================
def giphy_interactive_search():
    API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    term = input("\nEnter a term or phrase for GIF search: ").strip()
    if term:
        search_url = f"https://api.giphy.com/v1/gifs/search?q={term}&api_key={API_KEY}&limit=10"
        response = requests.get(search_url)
        if response.status_code == 200 and response.json()['data']:
            gifs = response.json()['data']
            print(f"\nTop {len(gifs)} GIFs for '{term}':")
        else:
            trending_url = f"https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&limit=10"
            response = requests.get(trending_url)
            gifs = response.json()['data']
            print(f"\nTerm not found. Showing trending GIFs ({len(gifs)}):")
        for gif in gifs:
            print(gif['url'])
    else:
        trending_url = f"https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&limit=10"
        response = requests.get(trending_url)
        gifs = response.json()['data']
        print(f"\nNo term entered. Showing trending GIFs ({len(gifs)}):")
        for gif in gifs:
            print(gif['url'])

# =========================
# Main Program
# =========================
def main():
    while True:
        print("\n1. Restaurant Menu Manager\n2. Giphy Fixed Search\n3. Giphy Interactive Search\n4. Exit Program")
        choice = input("Choose an option: ")
        if choice == '1':
            menu_interface()
        elif choice == '2':
            giphy_fixed_search()
        elif choice == '3':
            giphy_interactive_search()
        elif choice == '4':
            print("Exiting program...")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()