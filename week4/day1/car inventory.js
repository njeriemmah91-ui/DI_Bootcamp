const inventory = [
  { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
  { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
  { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
  { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 },
  { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
];

// ---------------- Part I: getCarHonda ----------------
function getCarHonda(carInventory) {
  // Find the first car with car_make "Honda"
  const hondaCar = carInventory.find(car => car.car_make === "Honda");
  
  // Return formatted string
  return `This is a ${hondaCar.car_make} ${hondaCar.car_model} from ${hondaCar.car_year}`;
}

// Test Part I
console.log("Part I Output:", getCarHonda(inventory));

// ---------------- Part II: sortCarInventoryByYear ----------------
function sortCarInventoryByYear(carInventory) {
  // Use slice() to copy array so original is not mutated
  return carInventory.slice().sort((a, b) => a.car_year - b.car_year);
}

// Test Part II
const sortedInventory = sortCarInventoryByYear(inventory);
console.log("Part II Output:", sortedInventory);