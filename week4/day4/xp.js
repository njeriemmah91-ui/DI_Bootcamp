// Exercises XP - Promises

// Exercise 1: Comparison with Promises
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve("Number is less than or equal to 10");
    } else {
      reject("Number is greater than 10");
    }
  });
}

// Test Exercise 1
compareToTen(15)
  .then(result => console.log("Exercise 1 Test 1:", result))
  .catch(error => console.log("Exercise 1 Test 1:", error));

compareToTen(8)
  .then(result => console.log("Exercise 1 Test 2:", result))
  .catch(error => console.log("Exercise 1 Test 2:", error));


// Exercise 2: Promise that resolves in 4 seconds
const delayedPromise = new Promise(resolve => {
  setTimeout(() => {
    resolve("success");
  }, 4000);
});

delayedPromise.then(result => console.log("Exercise 2:", result));


// Exercise 3: Promise.resolve & Promise.reject
// Resolve with value 3
Promise.resolve(3).then(result => console.log("Exercise 3 Resolved:", result));

// Reject with string "Boo!"
Promise.reject("Boo!").catch(error => console.log("Exercise 3 Rejected:", error));