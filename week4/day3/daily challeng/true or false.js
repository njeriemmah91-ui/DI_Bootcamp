// Function to check if all values are truthy
function allTruthy(...args) {
  return args.every(value => Boolean(value));
}

console.log(allTruthy(true, true, true)); 

console.log(allTruthy(true, false, true)); 


console.log(allTruthy(5, 4, 3, 2, 1, 0)); 


console.log(allTruthy("hello", 1, [])); 


console.log(allTruthy("", 10)); 