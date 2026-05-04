# rock-paper-scissors.py
from game import Game

def get_user_menu_choice():
    """
    Display menu and get user's choice.
    Validates input.
    """
    while True:
        print("=== Rock Paper Scissors Menu ===")
        print("1. Play a new game")
        print("2. Show scores")
        print("3. Quit")
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ["1", "2", "3"]:
            return choice
        else:
            print("Invalid option. Please enter 1, 2, or 3.\n")

def print_results(results):
    """
    Print the results dictionary in a user-friendly format.
    """
    print("\n=== Game Summary ===")
    print(f"Wins: {results.get('win', 0)}")
    print(f"Losses: {results.get('loss', 0)}")
    print(f"Draws: {results.get('draw', 0)}")
    print("\nThanks for playing!")

def main():
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        choice = get_user_menu_choice()

        if choice == "1":
            game = Game()
            result = game.play()
            results[result] += 1
        elif choice == "2":
            print_results(results)
        elif choice == "3":
            print_results(results)
            break

if __name__ == "__main__":
    main()