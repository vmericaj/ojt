// Sample JavaScript code to run in VS Code

console.log("Hello, welcome to VS Code!");

// Function to display the current date and time
function showDateTime() {
    const now = new Date();
    console.log(`Current Date and Time: ${now.toLocaleString()}`);
}

// Function to add two numbers
function addNumbers(a, b) {
    return a + b;
}

// Function to display a simple countdown
function countdown(n) {
    console.log(`Starting countdown from ${n}`);
    for (let i = n; i >= 0; i--) {
        console.log(i);
    }
    console.log("Countdown complete!");
}

// Run the functions
showDateTime();
console.log(`Sum of 5 and 10 is: ${addNumbers(5, 10)}`);
countdown(5);
