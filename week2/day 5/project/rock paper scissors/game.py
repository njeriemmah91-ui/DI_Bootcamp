# game.py
import random

class Game:
    def __init__(self):
        self.options = ["rock", "paper", "scissors"]

    def get_user_item(self):
        """
        Ask the user to select rock, paper, or scissors.
        Validate input and return it in lowercase.
        """
        while True:
            choice = input("Enter your choice (rock/paper/scissors): ").strip().lower()
            if choice in self.options:
                return choice
            else:
                print("Invalid choice. Please choose rock, paper, or scissors.")

    def get_computer_item(self):
        """
        Randomly select an item for the computer.
        """
        return random.choice(self.options)

    def get_game_result(self, user_item, computer_item):
        """
        Determine the result of the game.
        Returns "win", "draw", or "loss".
        """
        if user_item == computer_item:
            return "draw"
        elif (
            (user_item == "rock" and computer_item == "scissors") or
            (user_item == "scissors" and computer_item == "paper") or
            (user_item == "paper" and computer_item == "rock")
        ):
            return "win"
        else:
            return "loss"

    def play(self):
        """
        Play one round of the game.
        Prints choices and result, returns the result as a string.
        """
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)

        print(f"\nYou chose: {user_choice}")
        print(f"Computer chose: {computer_choice}")
        print(f"Result: {result.upper()}\n")

        return result