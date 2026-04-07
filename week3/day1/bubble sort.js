// ==========================
// Bubble Sort Challenge (Combined)
// ==========================

const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// --- Convert array to string ---
console.log("toString():", numbers.toString());

console.log("join('+'):", numbers.join("+"));
console.log("join(' '):", numbers.join(" "));
console.log("join(''):", numbers.join(""));

// --- Bubble Sort (Descending) ---
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length - 1; j++) {

    // Swap if current is smaller than next
    if (numbers[j] < numbers[j + 1]) {
      let temp = numbers[j];
      numbers[j] = numbers[j + 1];
      numbers[j + 1] = temp;
    }
  }

  // Show each step
  console.log("Step " + (i + 1) + ":", numbers);
}

// --- Final Result ---
console.log("Sorted array:", numbers);