// =======================
// Exercise 1: Numbers divisible by 23
// =======================
function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      console.log(i);
      sum += i;
    }
  }
  console.log("Sum:", sum);
}

// Test
displayNumbersDivisible();   // Numbers divisible by 23
displayNumbersDivisible(3);  // Bonus: Numbers divisible by 3

// =======================
// Exercise 2: Shopping List
// =======================
const stock = { banana: 6, apple: 0, pear: 12, orange: 32, blueberry: 1 };
const prices = { banana: 4, apple: 2, pear: 1, orange: 1.5, blueberry: 10 };
const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let total = 0;
  for (let item of shoppingList) {
    if (stock[item] > 0) {
      total += prices[item];
      stock[item]--; // decrease stock
    }
  }
  return total;
}

// Test
console.log("Total Bill:", myBill());
console.log("Updated Stock:", stock);

// =======================
// Exercise 3: What's in my wallet
// =======================
function changeEnough(itemPrice, amountOfChange) {
  const [quarters, dimes, nickels, pennies] = amountOfChange;
  const totalChange = quarters*0.25 + dimes*0.10 + nickels*0.05 + pennies*0.01;
  return totalChange >= itemPrice;
}

// Test
console.log(changeEnough(4.25, [25, 20, 5, 0])); // true
console.log(changeEnough(14.11, [2,100,0,0]));  // false
console.log(changeEnough(0.75, [0,0,20,5]));    // true

// =======================
// Exercise 4: Vacation Costs
// =======================
function hotelCost(nights) {
  return nights * 140;
}

function planeRideCost(destination) {
  if (destination === "London") return 183;
  if (destination === "Paris") return 220;
  return 300;
}

function rentalCarCost(days) {
  let cost = days * 40;
  if (days > 10) cost *= 0.95; // 5% discount
  return cost;
}

function totalVacationCost(nights=5, dest="Paris", days=7) {
  const hotel = hotelCost(nights);
  const plane = planeRideCost(dest);
  const car = rentalCarCost(days);
  return `Total vacation cost: $${hotel + plane + car}`;
}

// Test
console.log(totalVacationCost());