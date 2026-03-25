# Step 1: Create the board
def create_board():
    return [[" " for _ in range(3)] for _ in range(3)]


# Step 2: Display the board
def display_board(board):
    print("\nCurrent Board:")
    for i in range(3):
        print(" | ".join(board[i]))
        if i < 2:
            print("---------")
    print()


# Step 3: Get player input
def player_input(player, board):
    while True:
        try:
            row = int(input(f"Player {player}, enter row (0-2): "))
            col = int(input(f"Player {player}, enter column (0-2): "))

            if row not in range(3) or col not in range(3):
                print("Invalid input. Choose numbers between 0 and 2.")
            elif board[row][col] != " ":
                print("Cell already taken. Choose another.")
            else:
                return row, col
        except ValueError:
            print("Please enter valid numbers.")


# Step 4: Check for a winner
def check_win(board, player):
    symbol = player

    # Check rows
    for row in board:
        if all(cell == symbol for cell in row):
            return True

    # Check columns
    for col in range(3):
        if all(board[row][col] == symbol for row in range(3)):
            return True

    # Check diagonals
    if all(board[i][i] == symbol for i in range(3)):
        return True

    if all(board[i][2 - i] == symbol for i in range(3)):
        return True

    return False


# Step 5: Check for a tie
def check_tie(board):
    for row in board:
        if " " in row:
            return False
    return True


# Step 6: Main game loop
def play():
    board = create_board()
    current_player = "X"

    while True:
        display_board(board)

        row, col = player_input(current_player, board)
        board[row][col] = current_player

        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            break

        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break

        # Switch player
        current_player = "O" if current_player == "X" else "X"


# Start the game
play()