// Daily Challenge: Play with Words - Promises

// -------------------------
// 1st Daily Challenge
// -------------------------

// Function to uppercase all words
function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    if (words.every(word => typeof word === 'string')) {
      resolve(words.map(word => word.toUpperCase()));
    } else {
      reject("Error: All items in the array must be strings.");
    }
  });
}

// Function to sort words if length > 4
function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve(words.sort());
    } else {
      reject("Error: Array must contain more than 4 words to sort.");
    }
  });
}

// Test 1
makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// Test 2
makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));

// Test 3
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result)) // ["APPLE", "BANANA", "KIWI", "MELON", "PEAR"]
  .catch(error => console.log(error));


// -------------------------
// 2nd Daily Challenge
// -------------------------

const morse = `{
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  "a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
  "g": "--.", "h": "....", "i": "..", "j": ".---", "k": "-.-", "l": ".-..",
  "m": "--", "n": "-.", "o": "---", "p": ".--.", "q": "--.-", "r": ".-.",
  "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--", "x": "-..-",
  "y": "-.--", "z": "--..", ".": ".-.-.-", ",": "--..--", "?": "..--..",
  "!": "-.-.--", "-": "-....-", "/": "-..-.", "@": ".--.-.", "(": "-.--.",
  ")": "-.--.-"
}`;

// Convert morse JSON string to JS object
function toJs() {
  return new Promise((resolve, reject) => {
    const morseObj = JSON.parse(morse);
    if (Object.keys(morseObj).length === 0) {
      reject("Error: Morse object is empty.");
    } else {
      resolve(morseObj);
    }
  });
}

// Translate user input to morse
function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const input = prompt("Enter a word or sentence to convert to Morse:");
    const chars = input.toLowerCase().split('');
    const translation = [];
    for (let char of chars) {
      if (!morseJS[char]) {
        reject(`Error: Character "${char}" does not exist in Morse code.`);
        return;
      }
      translation.push(morseJS[char]);
    }
    resolve(translation);
  });
}

// Display morse translation on the page
function joinWords(morseTranslation) {
  const container = document.createElement("div");
  container.innerHTML = morseTranslation.join("<br>");
  document.body.appendChild(container);
}

// Chain the three functions
toJs()
  .then(morseJS => toMorse(morseJS))
  .then(translation => joinWords(translation))
  .catch(error => console.log(error));