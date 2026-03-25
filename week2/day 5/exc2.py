class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            return True
        return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required")

        if amount <= 0:
            raise Exception("Amount must be positive")

        self.balance += amount
        print(f"Deposited {amount}. Balance: {self.balance}")

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required")

        if amount <= 0:
            raise Exception("Amount must be positive")

        if amount > self.balance:
            raise Exception("Insufficient funds")

        self.balance -= amount
        print(f"Withdrew {amount}. Balance: {self.balance}")


class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required")

        if amount <= 0:
            raise Exception("Amount must be positive")

        if self.balance - amount < self.minimum_balance:
            raise Exception("Cannot go below minimum balance")

        self.balance -= amount
        print(f"Withdrew {amount}. Balance: {self.balance}")


class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list")

        for acc in account_list:
            if not isinstance(acc, BankAccount):
                raise Exception("Invalid account in list")

        self.account_list = account_list

        if not isinstance(try_limit, int) or try_limit <= 0:
            self.try_limit = 2
        else:
            self.try_limit = try_limit

        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n1. Log in\n2. Exit")
            choice = input("Choose: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Goodbye!")
                break
            else:
                print("Invalid choice")

    def log_in(self, username, password):
        for acc in self.account_list:
            if acc.authenticate(username, password):
                self.current_tries = 0
                self.show_account_menu(acc)
                return

        self.current_tries += 1
        print("Invalid credentials")

        if self.current_tries >= self.try_limit:
            print("Max tries reached")
            exit()

    def show_account_menu(self, account):
        while True:
            print("\n1. Deposit\n2. Withdraw\n3. Exit")
            choice = input("Choose: ")

            try:
                if choice == "1":
                    amount = int(input("Amount: "))
                    account.deposit(amount)

                elif choice == "2":
                    amount = int(input("Amount: "))
                    account.withdraw(amount)

                elif choice == "3":
                    account.authenticated = False
                    break

                else:
                    print("Invalid choice")

            except Exception as e:
                print(e)


# Example usage
if __name__ == "__main__":
    acc1 = BankAccount("user1", "pass1", 1000)
    acc2 = MinimumBalanceAccount("user2", "pass2", 500, 200)

    ATM([acc1, acc2], 3)