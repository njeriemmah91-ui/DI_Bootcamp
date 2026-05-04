// =========================
// 1. Define Types
// =========================

type User = {
  type: "user";
  name: string;
  age: number;
};

type Product = {
  type: "product";
  id: number;
  price: number;
};

type Order = {
  type: "order";
  orderId: string;
  amount: number;
};

// Union type
type Data = User | Product | Order;


// =========================
// 2. Type Guard Function
// =========================

function handleData(arr: Data[]): string[] {
  const result: string[] = [];

  for (let item of arr) {
    if (item.type === "user") {
      result.push(`User: ${item.name}, Age: ${item.age}`);
    }
    else if (item.type === "product") {
      result.push(`Product ID: ${item.id}, Price: ${item.price}`);
    }
    else if (item.type === "order") {
      result.push(`Order ID: ${item.orderId}, Amount: ${item.amount}`);
    }
    else {
      result.push("Unknown type detected");
    }
  }

  return result;
}


// =========================
// 3. Test Data
// =========================

const data: Data[] = [
  { type: "user", name: "John", age: 25 },
  { type: "product", id: 101, price: 500 },
  { type: "order", orderId: "ORD123", amount: 3 }
];

console.log(handleData(data));