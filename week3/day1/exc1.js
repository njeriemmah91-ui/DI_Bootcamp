// =======================
// Exercise 1: List of people
// =======================

let people = ["Greg", "Mary", "Devon", "James"];

// Modify array
people.shift(); // remove Greg
people[people.indexOf("James")] = "Jason";
people.push("Emmah");

// Outputs
console.log("Mary index:", people.indexOf("Mary"));
console.log("Copy:", people.slice(1, 3));
console.log("Foo index:", people.indexOf("Foo")); // -1 (not found)
console.log("Last element:", people[people.length - 1]);

// Loops
for (let person of people) console.log(person);

for (let person of people) {
  console.log(person);
  if (person === "Devon") break;
}


// =======================
// Exercise 2: Favorite colors
// =======================

const colors = ["blue", "red", "green", "black", "white"];
const suffix = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i + 1}${suffix[i]} choice is ${colors[i]}`);
}


// =======================
// Exercise 3: Repeat question
// =======================

// Works in browser only
/*
let num = Number(prompt("Enter a number:"));
while (num < 10) {
  num = Number(prompt("Enter a new number:"));
}
*/


// =======================
// Exercise 4: Building
// =======================

const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    thirdFloor: 9
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500]
  }
};

// Outputs
console.log("Floors:", building.numberOfFloors);
console.log(
  "Apts (1st & 3rd):",
  building.numberOfAptByFloor.firstFloor,
  building.numberOfAptByFloor.thirdFloor
);

console.log(
  "Second tenant:",
  building.nameOfTenants[1],
  building.numberOfRoomsAndRent.dan[0],
  "rooms"
);

// Rent check
let total =
  building.numberOfRoomsAndRent.sarah[1] +
  building.numberOfRoomsAndRent.david[1];

if (total > building.numberOfRoomsAndRent.dan[1]) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}


// =======================
// Exercise 5: Family
// =======================

const family = {
  father: "John",
  mother: "Jane",
  child: "Anna"
};

for (let key in family) console.log(key);
for (let key in family) console.log(family[key]);


// =======================
// Exercise 6: Rudolf
// =======================

const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer"
};

let sentence = "";
for (let key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());


// =======================
// Exercise 7: Secret Group
// =======================

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const secret = names
  .map(name => name[0])
  .sort()
  .join("");

console.log("Secret Society:", secret);