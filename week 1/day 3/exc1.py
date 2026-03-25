def encrypt(text, shift):
    result = ""
    
    for char in text:
        if char.isalpha():
            # Handle uppercase and lowercase separately
            base = ord('A') if char.isupper() else ord('a')
            result += chr((ord(char) - base + shift) % 26 + base)
        else:
            result += char  # keep spaces and symbols unchanged
    
    return result


def decrypt(text, shift):
    return encrypt(text, -shift)  # reverse the shift


# Main program
print("Welcome to Caesar Cipher ")

choice = input("Type 'encrypt' or 'decrypt': ").lower()
message = input("Enter your message: ")
shift = int(input("Enter shift number: "))

if choice == "encrypt":
    encrypted = encrypt(message, shift)
    print("Encrypted message:", encrypted)

elif choice == "decrypt":
    decrypted = decrypt(message, shift)
    print("Decrypted message:", decrypted)

else:
    print("Invalid choice!")