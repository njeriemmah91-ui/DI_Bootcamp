console.log("=== TypeScript OOP Exercises ===");

// ========================
// Exercise 1: Employee
// ========================
class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Name: ${this.name}, Position: ${this.position}`;
  }
}

const emp = new Employee("Alice", 50000, "Developer", "IT");
console.log(emp.getEmployeeInfo());


// ========================
// Exercise 2: Product
// ========================
class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getProductInfo(): string {
    return `Product: ${this.name}, Price: ${this.price}`;
  }
}

const p1 = new Product(1, "Laptop", 1200);
console.log(p1.getProductInfo());


// ========================
// Exercise 3: Inheritance
// ========================
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): string {
    return "Some sound";
  }
}

class Dog extends Animal {
  makeSound(): string {
    return "bark";
  }
}

const dog = new Dog("Buddy");
console.log(dog.makeSound());


// ========================
// Exercise 4: Static Methods
// ========================
class Calculator {
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log(Calculator.add(5, 3));
console.log(Calculator.subtract(10, 4));


// ========================
// Exercise 5: Interfaces
// ========================
interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log("ID:", user.id);
  console.log("Name:", user.name);
  console.log("Email:", user.email);

  if (user.membershipLevel) {
    console.log("Membership:", user.membershipLevel);
  }
}

const user1: PremiumUser = {
  id: 1,
  name: "Alice",
  email: "alice@email.com",
  membershipLevel: "Gold"
};

printUserDetails(user1);