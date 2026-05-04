// All Exercises Combined

// 1. is_Blank
function isBlank(str) {
    return str.length === 0;
}

// 2. Abbrev_name
function abbrevName(name) {
    let parts = name.split(' ');
    return parts[0] + ' ' + parts[1][0] + '.';
}

// 3. SwapCase
function swapCase(str) {
    let result = '';

    for (let char of str) {
        if (char === char.toUpperCase()) {
            result += char.toLowerCase();
        } else {
            result += char.toUpperCase();
        }
    }

    return result;
}

// 4. Omnipresent value
function isOmnipresent(arr, value) {
    return arr.every(subArr => subArr.includes(value));
}


// ================== TESTS ==================

console.log("Exercise 1:");
console.log(isBlank(''));      
console.log(isBlank('abc'));   

console.log("\nExercise 2:");
console.log(abbrevName("Robin Singh")); 

console.log("\nExercise 3:");
console.log(swapCase('The Quick Brown Fox')); 

console.log("\nExercise 4:");
const data = [[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]];
console.log(isOmnipresent(data, 3)); 
console.log(isOmnipresent(data, 4)); 