# Exercise: Call History

class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_record = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_record)
        self.call_history.append(call_record)

    def show_call_history(self):
        for call in self.call_history:
            print(call)

    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        self.messages.append(message)

    def show_outgoing_messages(self):
        for message in self.messages:
            if message["from"] == self.phone_number:
                print(message)

    def show_incoming_messages(self):
        for message in self.messages:
            if message["to"] == self.phone_number:
                print(message)

    def show_messages_from(self, number):
        for message in self.messages:
            if message["from"] == number:
                print(message)


# Testing

phone1 = Phone("12345")
phone2 = Phone("67890")

# Calls
phone1.call(phone2)
phone2.call(phone1)

print("\nCall History (Phone1):")
phone1.show_call_history()

print("\nCall History (Phone2):")
phone2.show_call_history()

# Messages
phone1.send_message(phone2, "Hello!")
phone2.send_message(phone1, "Hi there!")
phone1.send_message(phone2, "How are you?")

print("\nPhone1 Outgoing Messages:")
phone1.show_outgoing_messages()

print("\nPhone1 Incoming Messages:")
phone1.show_incoming_messages()

print("\nMessages sent from 12345:")
phone1.show_messages_from("12345")