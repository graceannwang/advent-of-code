// Load the input
const fs = require('node:fs');
const input = fs.readFileSync('./input.txt', 'utf8');
const rows = input.split('\n');

// Store left list into an array and right list into a map
const leftArr = [];
const rightMap = new Map();
for (let i = 0; i < rows.length; i += 1) {
    const rowVals = rows[i].split(' ');
    const l = rowVals[0];
    const r = rowVals[3];

    // Update array of left list
    leftArr.push(l);

    // Update right map
    if (rightMap.has(r)) {
        const newCount = (rightMap.get(r) + 1);
        rightMap.set(r, newCount);
    } 
    else {
        rightMap.set(r, 1);
    }
}

// Calculate similarity
let similarity = 0;
for (let i = 0; i < leftArr.length; i += 1) {
    const l = leftArr[i];
    
    let m = 0;
    if (rightMap.has(l)) {
        m = rightMap.get(l);
    }

    similarity += (l * m);
}

console.log(similarity);