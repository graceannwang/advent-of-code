// Load the input into list1 and list2
const fs = require('node:fs');
const input = fs.readFileSync('./input1.txt', 'utf8');
const rows = input.split('\n');

const list1 = [];
const list2 = [];

for (i in rows) {
    const pair = rows[i].split(' ');
    list1.push(parseInt(pair[0]));
    list2.push(parseInt(pair[3]));
}

// Sort the lists
list1.sort();
list2.sort();

// Calculate distance
let total = 0;
for (i in rows) {
    const diff = Math.abs(list1[i] - list2[i]);
    total += diff;
}

console.log(total);
