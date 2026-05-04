import random

# Step 1: Card class
class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __str__(self):
        return f"{self.value} of {self.suit}"

# Step 2: Deck class
class Deck:
    def __init__(self):
        self.cards = []
        self.build_deck()

    def build_deck(self):
        """Create all 52 cards and store in self.cards"""
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
        self.cards = [Card(suit, value) for suit in suits for value in values]

    def shuffle(self):
        """Shuffle the deck randomly"""
        if len(self.cards) != 52:
            print("Warning: Not a full deck!")
        random.shuffle(self.cards)

    def deal(self):
        """Deal a single card from the deck and remove it"""
        if len(self.cards) == 0:
            return "No cards left to deal."
        return self.cards.pop()

# Example Usage
if __name__ == "__main__":
    deck = Deck()          # Create a deck
    deck.shuffle()         # Shuffle it
    print("Dealing 5 cards:")
    for _ in range(5):
        card = deck.deal()
        print(card)