// ================= Exercise 1: Random Number =================
let randomNum = Math.floor(Math.random() * 100) + 1;

console.log("Random Number:", randomNum);
console.log("Even numbers up to random number:");

for (let i = 0; i <= randomNum; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}


// ================= Exercise 2: Capitalized letters =================
function capitalize(str) {
    let even = '';
    let odd = '';

    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            even += str[i].toUpperCase();
            odd += str[i];
        } else {
            even += str[i];
            odd += str[i].toUpperCase();
        }
    }

    return [even, odd];
}

console.log("\nExercise 2:");
console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']


// ================= Exercise 3: Palindrome =================
function isPalindrome(str) {
    let reversed = str.split('').reverse().join('');
    return str === reversed;
}

console.log("\nExercise 3:");
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


// ================= Exercise 4: Biggest Number =================
function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) return 0;

    let max = -Infinity;

    for (let item of arrayNumber) {
        if (typeof item === "number" && item > max) {
            max = item;
        }
    }

    return max === -Infinity ? 0 : max;
}

console.log("\nExercise 4:");
console.log(biggestNumberInArray([-1,0,3,100,99,2,99])); // 100
console.log(biggestNumberInArray(['a', 3, 4, 2])); // 4
console.log(biggestNumberInArray([])); // 0


// ================= Exercise 5: Unique Elements =================
function uniqueArray(arr) {
    return [...new Set(arr)];
}

console.log("\nExercise 5:");
console.log(uniqueArray([1,2,3,3,3,3,4,5])); // [1,2,3,4,5]


// ================= Exercise 6: Calendar =================
function createCalendar(year, month) {
    let table = document.createElement("table");
    let days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

    // Header row
    let headerRow = document.createElement("tr");
    for (let day of days) {
        let th = document.createElement("th");
        th.textContent = day;
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    let date = new Date(year, month - 1, 1);
    let row = document.createElement("tr");

    // Adjust start (Monday = 0)
    let startDay = (date.getDay() + 6) % 7;

    // Empty cells before first day
    for (let i = 0; i < startDay; i++) {
        row.appendChild(document.createElement("td"));
    }

    while (date.getMonth() === month - 1) {
        let td = document.createElement("td");
        td.textContent = date.getDate();
        row.appendChild(td);

        if ((date.getDay() + 6) % 7 === 6) {
            table.appendChild(row);
            row = document.createElement("tr");
        }

        date.setDate(date.getDate() + 1);
    }

    // Fill last row
    if (row.children.length > 0) {
        while (row.children.length < 7) {
            row.appendChild(document.createElement("td"));
        }
        table.appendChild(row);
    }

    document.body.appendChild(table);
}

// Example (run in browser)
createCalendar(2012, 9);