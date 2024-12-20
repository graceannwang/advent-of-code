// Read the input
const fs = require('node:fs');
const input = fs.readFileSync('./input.txt', 'utf-8');
const rows = input.split('\n');

const PATTERNS = rows[0].split(', ').sort((a, b) => (-1 * (a.length - b.length)));
const DESIGNS = rows.splice(2);

// Save design slices which are impossible to construct from PATTERNS. This speeds up the solve.
const BAD_SLICES = new Set();  

// Helper functions
function patternAtStartOfDesign(pattern, design) {
    if (pattern.length > design.length) return null; 

    design_start = design.substring(0, pattern.length);
    if (pattern === design_start) {
        return design.substring(design_start.length);
    } 

    return null;
}

function designIsViable(design) {
    if (BAD_SLICES.has(design)) return false;
    
    const designSlices = [];

    // Check if any p in PATTERNS match the first part of the given design slice
    for (i in PATTERNS) {
        const pattern = PATTERNS[i];

        const designSlice = patternAtStartOfDesign(pattern, design);

        if (designSlice === '') return true; // design is viable
        if (designSlice !== null) {
            designSlices.push(designSlice);
        }
    }

    // For all patterns that do match, slice the rest of the design and repeat
    // This below can be simplified/moved up into the for loop above, but kept for ease of debugging/readability
    for (i in designSlices) {
        const designSlice = designSlices[i];
        const designSliceViability = designIsViable(designSlice);

        if (designSliceViability === true) {
            return true;
        } else if (designSliceViability === false) {
            BAD_SLICES.add(designSlice);
        }
    }
    return false; // design not viable 
}

// Solve
function solve() {
    var viableDesigns = [];

    for (i in DESIGNS) {
        const design = DESIGNS[i];
        console.log('Solving design: ' + design);

        const viability = designIsViable(design);
        console.log(viability);
        viableDesigns.push(viability);
    }

    const count = viableDesigns.filter(b => b == true).length;
    console.log(count);
}

solve();