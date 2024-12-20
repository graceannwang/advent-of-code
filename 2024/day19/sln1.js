// Read the input
const fs = require('node:fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
const rows = input.split('\n');

// const PATTERNS = rows[0].split(', ').sort((a, b) => (-1 * (a.length - b.length)));
// const DESIGNS = rows.splice(2);
const PATTERNS = ['r', 'wr', 'b', 'g', 'bwu', 'rb', 'gb', 'br'].sort((a, b) => -1 * (a.length - b.length));
const DESIGNS = ['brwrr',
    'bggr',
    'gbbr',
    'rrbgbr',
    'ubwu',
    'bwurrg',
    'brgr',
    'bbrgwb']

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

        if (designSlice === '') return true; // design is viable
        if (designSlice !== null) {
            designSlices.push(designSlice);
        }
    }

    for (i in designSlices) {
        const designSlice = designSlices[i];
        const designSliceViability = designIsViable(designSlice);

        if (designSliceViability === true) return true;
    }
    return false; // design not viable 
}

function solve() {
    var viableDesigns = [];

    for (i in DESIGNS) {
        const design = DESIGNS[i];
        console.log('Solving design: ' + design);

        const viability = designIsViable(design);
        console.log('  ' + viability);
        viableDesigns.push(viability);
    }

    const count = viableDesigns.filter(b => b == true).length;
    console.log(count);
}

solve();
// console.log(PATTERNS);