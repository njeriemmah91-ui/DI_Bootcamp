// ---------- Exercise 1: Map method ----------
const doubledNumbers = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return;
});
console.log("Exercise 1 Output:", doubledNumbers);

// ---------- Exercise 2: Reduce method ----------
const reducedArray = [[0, 1], [2, 3]].reduce(
  (acc, cur) => acc.concat(cur),
  [1, 2]
);
console.log("Exercise 2 Output:", reducedArray);

// ---------- Exercise 3: Map callback parameters ----------
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log("Exercise 3 - num and index:", num, i);
    return num * 2;
});
// i is index: 0, 1, 2, 3, 4, 5
console.log("Exercise 3 - Doubled array:", newArray);

// ---------- Exercise 4: Nested arrays ----------

// a) Flatten array once
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const flatArray = array.map(item => item.flat());
console.log("Exercise 4a Output:", flatArray); 

// b) Flatten and join greetings
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const flattenedGreetings = greeting.map(arr => arr.join(" "));
console.log("Exercise 4b Output:", flattenedGreetings); 


const greetingStr = flattenedGreetings.join(" ");
console.log("Exercise 4b - Combined string:", greetingStr); 


// c) Trapped number
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const untrapped = trapped.flat(Infinity);
console.log("Exercise 4c Output:", untrapped); 