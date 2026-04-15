"use strict";
console.log("=== TypeScript OOP Exercises ===");
// ========================
// Exercise 1: Employee
// ========================
class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}
const emp = new Employee("Alice", 50000, "Developer", "IT");
console.log(emp.getEmployeeInfo());
// ========================
// Exercise 2: Product
// ========================
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return `Product: ${this.name}, Price: ${this.price}`;
    }
}
const p1 = new Product(1, "Laptop", 1200);
console.log(p1.getProductInfo());
// ========================
// Exercise 3: Inheritance
// ========================
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return "Some sound";
    }
}
class Dog extends Animal {
    makeSound() {
        return "bark";
    }
}
const dog = new Dog("Buddy");
console.log(dog.makeSound());
// ========================
// Exercise 4: Static Methods
// ========================
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
console.log(Calculator.add(5, 3));
console.log(Calculator.subtract(10, 4));
function printUserDetails(user) {
    console.log("ID:", user.id);
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    if (user.membershipLevel) {
        console.log("Membership:", user.membershipLevel);
    }
}
const user1 = {
    id: 1,
    name: "Alice",
    email: "alice@email.com",
    membershipLevel: "Gold"
};
printUserDetails(user1);
