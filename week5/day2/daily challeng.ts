function validateUnionType(value: any, allowedTypes: string[]): boolean {
  return allowedTypes.includes(typeof value);
}

const value1 = "Hello";
const value2 = 100;

const allowedTypes = ["string", "number"];

const result1 = validateUnionType(value1, allowedTypes);
const result2 = validateUnionType(value2, allowedTypes);