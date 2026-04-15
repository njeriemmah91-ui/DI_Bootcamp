function validateUnionType(value: any, allowedTypes: string[]): boolean {
  for (let i = 0; i < allowedTypes.length; i++) {
    if (typeof value === allowedTypes[i]) {
      return true;
    }
  }
  return false;
}

// ====== Demonstration ======

const value1 = "Hello World";
const value2 = 42;
const value3 = true;
const value4 = { name: "John" };

// Allowed types
const allowed1 = ["string", "number"];
const allowed2 = ["boolean"];
const allowed3 = ["object"];

// Testing
console.log(validateUnionType(value1, allowed1)); 
console.log(validateUnionType(value2, allowed1)); 
console.log(validateUnionType(value3, allowed1)); 
console.log(validateUnionType(value3, allowed2)); 
console.log(validateUnionType(value4, allowed3)); 