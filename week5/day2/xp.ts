
// Exercise 1: Hello World
console.log("Hello, World!");

// Exercise 2: Type Annotations
let age: number = 25;
let userName: string = "Alice";

console.log(age);
console.log(userName);

// Exercise 3: Union Types
let id: string | number;

id = 101;
console.log(id);

id = "A102";
console.log(id);

// Exercise 4: if...else
function checkNumber(num: number): string {
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero";
}

console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));

// Exercise 5: Tuple
function getDetails(name: string, age: number): [string, number, string] {
  return [name, age, `Hello, ${name}! You are ${age} years old.`];
}

const details = getDetails("Alice", 25);
console.log(details);

// Exercise 6: Object Type
type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}

console.log(createPerson("Alice", 25));

// Exercise 7: Type Assertion (safe check for browser)
if (typeof document !== "undefined") {
  const input = document.getElementById("myInput") as HTMLInputElement | null;

  if (input) {
    input.value = "Hello TypeScript";
    console.log("Input value set:", input.value);
  }
} else {
  console.log("No DOM available (running in Node.js)");
}

// Exercise 8: switch statement
function getAction(role: string): string {
  switch (role) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));

// Exercise 9: Function Overloading
function greet(): string;
function greet(name: string): string;

function greet(name?: string): string {
  return name ? `Hello, ${name}!` : "Hello, Guest!";
}

console.log(greet("Alice"));
console.log(greet());