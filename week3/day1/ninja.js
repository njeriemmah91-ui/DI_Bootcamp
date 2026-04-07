// ==========================
// Exercise 1: Checking the BMI
// ==========================

// Person 1 object
let person1 = {
  fullName: "John Doe",
  mass: 70,
  height: 1.75,
  calcBMI: function () {
    return this.mass / (this.height * this.height);
  }
};

// Person 2 object
let person2 = {
  fullName: "Jane Smith",
  mass: 60,
  height: 1.65,
  calcBMI: function () {
    return this.mass / (this.height * this.height);
  }
};

// Function to compare BMI
function compareBMI(p1, p2) {
  let bmi1 = p1.calcBMI();
  let bmi2 = p2.calcBMI();

  if (bmi1 > bmi2) {
    console.log(p1.fullName + " has the higher BMI.");
  } else if (bmi2 > bmi1) {
    console.log(p2.fullName + " has the higher BMI.");
  } else {
    console.log("Both have the same BMI.");
  }
}

// Call function
compareBMI(person1, person2);


// ==========================
// Exercise 2: Grade Average
// ==========================

// Function to calculate average
function findAvg(gradesList) {
  let sum = 0;

  for (let i = 0; i < gradesList.length; i++) {
    sum += gradesList[i];
  }

  let average = sum / gradesList.length;
  console.log("Average:", average);

  checkPassFail(average);
}

// Function to check pass/fail
function checkPassFail(avg) {
  if (avg > 65) {
    console.log("You passed.");
  } else {
    console.log("You failed and must repeat the course.");
  }
}

// Example usage
let grades = [70, 60, 80, 90, 50];
findAvg(grades);