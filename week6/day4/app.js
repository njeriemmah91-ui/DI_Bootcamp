// ===============================
// EXERCISE 1: PRODUCTS
// ===============================
const products = [
  { name: "Laptop", price: 80000, category: "Electronics" },
  { name: "Phone", price: 30000, category: "Electronics" },
  { name: "Shoes", price: 5000, category: "Fashion" }
];

function findProduct(name) {
  const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
  console.log("Search:", name, "=>", product || "Not found");
}

console.log("\n=== Exercise 1 ===");
findProduct("Laptop");
findProduct("Shoes");
findProduct("TV");


// ===============================
// EXERCISE 2: AVERAGE AGE
// ===============================
const people = [
  { name: "John", age: 25, location: "USA" },
  { name: "Jane", age: 30, location: "UK" },
  { name: "Mike", age: 35, location: "Canada" }
];

function averageAge(arr) {
  const total = arr.reduce((sum, p) => sum + p.age, 0);
  return total / arr.length;
}

console.log("\n=== Exercise 2 ===");
console.log("Average age:", averageAge(people));


// ===============================
// EXERCISE 3: FILE MANAGER
// ===============================
const fs = require('fs');

function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

console.log("\n=== Exercise 3 ===");

// make sure files exist
fs.writeFileSync("Hello World.txt", "Hello World !!");
fs.writeFileSync("Bye World.txt", "Bye World !!");

const fileContent = readFile("Hello World.txt");
console.log("Read:", fileContent);

writeFile("Bye World.txt", "Writing to the file");
console.log("Written to Bye World.txt");


// ===============================
// EXERCISE 4: TODO LIST
// ===============================
class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, completed: false });
  }

  completeTask(name) {
    const task = this.tasks.find(t => t.task === name);
    if (task) task.completed = true;
  }

  listTasks() {
    console.log(this.tasks);
  }
}

console.log("\n=== Exercise 4 ===");

const todo = new TodoList();
todo.addTask("Study Node");
todo.addTask("Build Project");
todo.completeTask("Study Node");
todo.listTasks();


// ===============================
// EXERCISE 5: CUSTOM MATH + LODASH
// ===============================
const _ = require('lodash');

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

console.log("\n=== Exercise 5 ===");

console.log("Add:", add(2, 3));
console.log("Multiply:", multiply(2, 3));
console.log("Chunk:", _.chunk([1,2,3,4,5], 2));


// ===============================
// EXERCISE 6: CHALK
// ===============================
const chalk = require('chalk');

console.log("\n=== Exercise 6 ===");

console.log(chalk.blue("Hello World"));
console.log(chalk.green("Success"));
console.log(chalk.red("Error"));


// ===============================
// EXERCISE 7: FILE EXPLORER
// ===============================
console.log("\n=== Exercise 7 ===");

// create source file
fs.writeFileSync("source.txt", "This is the source file");

// copy file
const data = fs.readFileSync("source.txt", "utf-8");
fs.writeFileSync("destination.txt", data);

console.log("File copied!");

// list directory
const files = fs.readdirSync("./");
console.log("Files in folder:");
files.forEach(file => console.log(file));
