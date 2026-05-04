"use strict";
// =========================
// Exercise 1: Intersection Types
// =========================
const user = {
    name: "John",
    age: 25,
    street: "Kenyatta Avenue",
    city: "Nairobi"
};
console.log("Exercise 1:", user);
// =========================
// Exercise 2: Type Guards
// =========================
function describeValue(value) {
    if (typeof value === "number") {
        return "This is a number";
    }
    else {
        return "This is a string";
    }
}
console.log("Exercise 2:", describeValue(10));
console.log("Exercise 2:", describeValue("hello"));
// =========================
// Exercise 3: Type Casting
// =========================
let someValue = "Hello World";
let strValue = String(someValue);
console.log("Exercise 3:", strValue);
// =========================
// Exercise 4: Type Assertions
// =========================
function getFirstElement(arr) {
    return arr[0];
}
console.log("Exercise 4:", getFirstElement(["hello", 123]));
// =========================
// Exercise 5: Generic Constraints
// =========================
function logLength(input) {
    console.log("Exercise 5:", input.length);
}
logLength("Hello");
logLength([1, 2, 3]);
function describeEmployee(emp) {
    if (emp.position === "Manager") {
        return `${emp.name} is a Manager in ${emp.department}`;
    }
    else if (emp.position === "Developer") {
        return `${emp.name} is a Developer in ${emp.department}`;
    }
    else {
        return `${emp.name} works in ${emp.department}`;
    }
}
const emp1 = {
    name: "Alice",
    age: 30,
    position: "Developer",
    department: "IT"
};
console.log("Exercise 6:", describeEmployee(emp1));
// =========================
// Exercise 7: Generics + Constraints + Assertion
// =========================
function formatInput(input) {
    const value = input;
    return value.toString();
}
console.log("Exercise 7:", formatInput(123));
console.log("Exercise 7:", formatInput("TypeScript"));
