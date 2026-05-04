// ========================= Complete Exercises =========================

// ---------- Exercise 1: Location ----------
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
};

const { name, location: { country, city, coordinates: [lat, lng] } } = person;
console.log(`Exercise 1 Output: I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

// ---------- Exercise 2: Display Student Info ----------
function displayStudentInfo({ first, last }) {
    return `Your full name is ${first} ${last}`;
}
console.log("Exercise 2 Output:", displayStudentInfo({ first: 'Elie', last: 'Schoppik' }));

// ---------- Exercise 3: User & ID ----------
const users = { user1: 18273, user2: 92833, user3: 90315 };

const usersArray = Object.entries(users);
console.log("Exercise 3 - Part 1 Output:", usersArray);

const updatedUsersArray = usersArray.map(([user, id]) => [user, id * 2]);
console.log("Exercise 3 - Part 2 Output:", updatedUsersArray);

// ---------- Exercise 4: Person Class ----------
class Person {
    constructor(name) {
        this.name = name;
    }
}
const member = new Person('John');
console.log("Exercise 4 Output:", typeof member);

// ---------- Exercise 5: Dog class ----------
class Dog {
    constructor(name) {
        this.name = name;
    }
}
class Labrador extends Dog {
    constructor(name, size) {
        super(name);
        this.size = size;
    }
}
const lab = new Labrador("Buddy", "Large");
console.log("Exercise 5 Output:", lab.name, lab.size);

// ---------- Exercise 6: Challenges ----------
console.log("Exercise 6a:", [2] === [2]);
console.log("Exercise 6b:", {} === {});

const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5 };

object1.number = 4;
console.log("object2.number:", object2.number);
console.log("object3.number:", object3.number);
console.log("object4.number:", object4.number);

// ---------- Exercise 6c: Animal & Mammal Classes ----------
class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    sound(soundStr) {
        return `${soundStr} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white");
console.log("Exercise 6c Output:", farmerCow.sound("Moooo"));