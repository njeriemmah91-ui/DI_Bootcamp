// Helper to show results on the HTML page
const render = (text) => {
    const area = document.getElementById('display-area');
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = text;
    area.appendChild(div);
};

// --- Exercise 1: Scope (Predictions in Console) ---
console.log("--- Exercise 1 Predictions ---");

// #1
(function funcOne() {
    let a = 5;
    if(a > 1) { a = 3; }
    console.log(`Ex 1.1: inside funcOne is 3 (reassigned)`);
})();

// #2
let a2 = 0;
function funcTwo() { a2 = 5; }
function funcThree() { console.log(`Ex 2.1: inside funcThree is ${a2}`); }
funcThree(); // 0
funcTwo();
funcThree(); // 5 (global a changed)

// #4 (Shadowing)
let a4 = 1;
function funcSix() {
    let a4 = "test";
    console.log(`Ex 4.1: inside funcSix is ${a4}`); // "test"
}
funcSix();

// --- Exercise 2: Ternary ---
const winBattle = () => true;
let experiencePoints = winBattle() ? 10 : 1;
render(`<strong>Exercise 2 (Ternary):</strong> Experience Points: ${experiencePoints}`);

// --- Exercise 3: Is it a string? ---
const isString = (val) => typeof val === 'string';
render(`<strong>Exercise 3 (String Check):</strong> 'hello' is string? ${isString('hello')}`);

// --- Exercise 4: Sum ---
const sum = (a, b) => a + b;
render(`<strong>Exercise 4 (Sum):</strong> 10 + 20 = ${sum(10, 20)}`);

// --- Exercise 5: Kg and Grams ---
// Function declaration vs expression: Declarations are hoisted, expressions are not.
const convertToGrams = (kg) => kg * 1000;
render(`<strong>Exercise 5 (Kg to G):</strong> 2kg = ${convertToGrams(2)}g`);

// --- Exercise 6: Fortune Teller ---
(function(kids, partner, loc, job) {
    const str = `You will be a ${job} in ${loc}, and married to ${partner} with ${kids} kids.`;
    render(`<strong>Exercise 6 (Fortune):</strong> ${str}`);
})(3, "Alex", "Tokyo", "Web Developer");

// --- Exercise 7: Welcome ---
(function(name) {
    const nav = document.getElementById('nav-target');
    const div = document.createElement('div');
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "10px";
    div.innerHTML = `<span>Welcome, <b>${name}</b></span> <img src="https://picsum.photos/35" style="border-radius:50%">`;
    nav.appendChild(div);
})("John");

// --- Exercise 8: Juice Bar ---
function makeJuice(size) {
    const ingredients = [];

    function addIngredients(i1, i2, i3) {
        ingredients.push(i1, i2, i3);
    }

    function displayJuice() {
        const str = `The client wants a ${size} juice, containing ${ingredients.join(", ")}.`;
        render(`<strong>Exercise 8 (Juice):</strong> ${str}`);
    }

    addIngredients("Apple", "Ginger", "Lemon");
    addIngredients("Strawberry", "Banana", "Mint");
    displayJuice();
}
makeJuice("Medium");