// =========================
// Exercise 1: Intersection Types
// =========================

type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const user: PersonWithAddress = {
  name: "John",
  age: 25,
  street: "Kenyatta Avenue",
  city: "Nairobi"
};

console.log("Exercise 1:", user);


// =========================
// Exercise 2: Type Guards
// =========================

function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}

console.log("Exercise 2:", describeValue(10));
console.log("Exercise 2:", describeValue("hello"));


// =========================
// Exercise 3: Type Casting
// =========================

let someValue: any = "Hello World";

let strValue: string = String(someValue);

console.log("Exercise 3:", strValue);


// =========================
// Exercise 4: Type Assertions
// =========================

function getFirstElement(arr: (number | string)[]): string {
  return arr[0] as string;
}

console.log("Exercise 4:", getFirstElement(["hello", 123]));


// =========================
// Exercise 5: Generic Constraints
// =========================

function logLength<T extends { length: number }>(input: T): void {
  console.log("Exercise 5:", input.length);
}

logLength("Hello");
logLength([1, 2, 3]);


// =========================
// Exercise 6: Intersection + Type Guards
// =========================

type Job = {
  position: string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(emp: Employee): string {
  if (emp.position === "Manager") {
    return `${emp.name} is a Manager in ${emp.department}`;
  } else if (emp.position === "Developer") {
    return `${emp.name} is a Developer in ${emp.department}`;
  } else {
    return `${emp.name} works in ${emp.department}`;
  }
}

const emp1: Employee = {
  name: "Alice",
  age: 30,
  position: "Developer",
  department: "IT"
};

console.log("Exercise 6:", describeEmployee(emp1));


// =========================
// Exercise 7: Generics + Constraints + Assertion
// =========================

function formatInput<T extends { toString(): string }>(input: T): string {
  const value = input as unknown as string;
  return value.toString();
}

console.log("Exercise 7:", formatInput(123));
console.log("Exercise 7:", formatInput("TypeScript"));