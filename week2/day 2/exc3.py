import time
import copy


class Cell:
    def __init__(self, state=False):
        self.state = state  # True = alive, False = dead


class Grid:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.grid = [[Cell(False) for _ in range(cols)] for _ in range(rows)]

    def set_alive(self, row, col):
        self.grid[row][col].state = True

    def display(self):
        for row in self.grid:
            print(" ".join("⬛" if cell.state else "⬜" for cell in row))
        print()

    def count_live_neighbors(self, row, col):
        directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),          (0, 1),
            (1, -1), (1, 0), (1, 1)
        ]

        count = 0
        for dr, dc in directions:
            r, c = row + dr, col + dc
            if 0 <= r < self.rows and 0 <= c < self.cols:
                if self.grid[r][c].state:
                    count += 1
        return count


class GameOfLife:
    def __init__(self, rows, cols):
        self.grid = Grid(rows, cols)

    def next_generation(self):
        new_grid = copy.deepcopy(self.grid)

        for i in range(self.grid.rows):
            for j in range(self.grid.cols):
                live_neighbors = self.grid.count_live_neighbors(i, j)
                cell = self.grid.grid[i][j]

                if cell.state:  # Alive
                    if live_neighbors < 2 or live_neighbors > 3:
                        new_grid.grid[i][j].state = False
                else:  # Dead
                    if live_neighbors == 3:
                        new_grid.grid[i][j].state = True

        self.grid = new_grid

    def run(self, generations=10, delay=0.5):
        for gen in range(generations):
            print(f"Generation {gen + 1}")
            self.grid.display()
            self.next_generation()
            time.sleep(delay)


# -------------------------
# Example Usage
# -------------------------

if __name__ == "__main__":
    game = GameOfLife(10, 10)

    # Initial pattern (Glider)
    game.grid.set_alive(1, 2)
    game.grid.set_alive(2, 3)
    game.grid.set_alive(3, 1)
    game.grid.set_alive(3, 2)
    game.grid.set_alive(3, 3)

    game.run(15, 0.3)