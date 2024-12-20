// Read the input
const fs = require('node:fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
const rows = input.split('\n');

const PATTERNS = rows[0].split(', ');
const DESIGNS = rows.splice(2);
// const PATTERNS = ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br'];
// const DESIGNS = ['brwrr',
//     'bggr',
//     'gbbr',
//     'rrbgbr',
//     'ubwu',
//     'bwurrg',
//     'brgr',
//     'bbrgwb']

function patternAtStartOfDesign(pattern, design) {
    if (pattern.length > design.length) return null; 

    design_start = design.substring(0, pattern.length);
    if (pattern === design_start) {
        return design.substring(design_start.length);
    } 

    return null;
}

function designIsViable(design) {
    const designSlices = []
    for (i in PATTERNS) {
        pattern = PATTERNS[i];

        const designSlice = patternAtStartOfDesign(pattern, design);

        if (designSlice === '') return true; // Base case: last pattern in design has been matched
        if (designSlice !== null) {
            designSlices.push(designSlice);
        }
    }

    if (designSlices.length === 0) return false; // Base case: nothing matches design pattern

    const viablePaths = []

    for (i in designSlices) {
        const designSlice = designSlices[i];
        const designSliceViability = designIsViable(designSlice);

        viablePaths.push(designSliceViability);
    }

    return viablePaths.includes(true);
}

function solve() {
    var viableDesigns = [];

    for (i in DESIGNS) {
        viableDesigns.push(designIsViable(DESIGNS[i]));
    }

    const count = viableDesigns.filter(b => b == true).length;
    console.log(count);
}

solve();