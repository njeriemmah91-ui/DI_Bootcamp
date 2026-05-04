// ==========================
// Exercise 1: Divisible by Three
// ==========================
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 3 === 0) {
    console.log(true);
  } else {
    console.log(false);
  }
}


// ==========================
// Exercise 2: Attendance
// ==========================
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
};

let name = prompt("Enter your name:");

if (name in guestList) {
  console.log("Hi! I'm " + name + ", and I'm from " + guestList[name] + ".");
} else {
  console.log("Hi! I'm a guest.");
}


// ==========================
// Exercise 3: Playing with Numbers
// ==========================
let age = [20, 5, 12, 43, 98, 55];

// Sum of all numbers
let sum = 0;
for (let i = 0; i < age.length; i++) {
  sum += age[i];
}
console.log("Sum:", sum);

// Highest number
let max = age[0];
for (let i = 1; i < age.length; i++) {
  if (age[i] > max) {
    max = age[i];
  }
}
console.log("Highest age:", max);