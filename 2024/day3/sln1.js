const fs = require('node:fs');
const input = fs.readFileSync('input1.txt').toString();

const re = /mul\(([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\)/g;
const found = input.match(re);

if (!Object.is(found, null)) {
    console.log(found);
}
