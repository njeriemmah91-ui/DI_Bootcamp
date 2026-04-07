// Prompt user input
let input = prompt("Enter words separated by commas:");

// Convert to array and trim spaces
let words = input.split(",").map(word => word.trim());

// Find longest word length
let maxLength = 0;
for (let word of words) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

// Create top/bottom border
let border = "*".repeat(maxLength + 4);
console.log(border);

// Print words inside frame
for (let word of words) {
    let spaces = " ".repeat(maxLength - word.length);
    console.log("* " + word + spaces + " *");
}

// Bottom border
console.log(border);