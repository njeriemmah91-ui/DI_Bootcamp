MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

# Convert string into 2D list
rows = [row for row in MATRIX_STR.split("\n") if row.strip() != ""]
matrix = [list(row) for row in rows]

decoded_chars = []

max_cols = max(len(row) for row in matrix)

for col in range(max_cols):
    for row in matrix:
        if col < len(row):
            char = row[col]
            if char.isalpha():
                decoded_chars.append(char)
            else:
                decoded_chars.append(" ")

message = "".join(decoded_chars)
final_message = " ".join(message.split())

print(final_message)