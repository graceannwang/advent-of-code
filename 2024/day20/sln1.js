// Reads from file input and stores racetrack in 2d array
function populateRacemap(filename) {
    const fs = require('node:fs');
    const input = fs.readFileSync(filename, 'utf-8');
    const rows = input.split('\n');

    const racemap = [];
    const T = new Map();

    for (i in rows) 
        racemap.push(rows[i].split(''));

    return racemap;
}

// Finds S
function findStart(racemap) {
    for (i in racemap) {
        for (j in racemap[i]) {
            if (racemap[i][j] === 'S') return { x: parseInt(i), y: parseInt(j) };
        }
    }

    return (null, null);
}

function ptsAreEqual(a, b) {
    return (a.x === b.x) && (a.y === b.y);
}

// Return the coordinates for the next viable move
function nextMove(racemap, pt, prevPt) {
    const increments = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    for (i in increments) {
        const incr = increments[i];

        const nextX = pt.x + incr[0];
        const nextY = pt.y + incr[1];

        if (!ptsAreEqual(prevPt, {x: nextX, y: nextY})) {
            const nextVal = racemap[nextX][nextY];
            if (nextVal) {
                if (nextVal === '.' || nextVal === 'E') return { x: nextX, y: nextY };
            }
        }
    }
    return null;
}

// Traverse unaltered racetrack and populate ptTimes
function traverse(racemap) {
    const ptTimes = new Map();
    const startPt = findStart(racemap);

    var prevPt = {x: null, y: null};
    var pt = startPt;
    var time = 0;

    do {
        ptTimes.set(pt, time);

        const nextPt = nextMove(racemap, pt, prevPt);

        prevPt = pt;
        pt = nextPt;
        time += 1;
    } while (pt);

    return ptTimes; 
}

const racemap = populateRacemap('test.txt');