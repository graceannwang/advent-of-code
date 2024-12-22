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

// Returns a list of points which represent the next possible steps given a point
function getNeighbors(pt, rmWidth, rmLength) {
    const nbrs = [];
    const steps = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    for (i in steps) {
        const step = steps[i];

        const nextX = pt.x + step[0];
        const nextY = pt.y + step[1];

        const validNextX = (nextX >= 0) && (nextX < rmWidth);
        const validNextY = (nextY >= 0) && (nextY < rmLength);

        if (validNextX && validNextY) nbrs.push({ x: nextX, y: nextY });
    }

    return nbrs; 
}

// Return the coordinates for the next viable move
function nextMove(racemap, pt, prevPt) {
    const nbrs = getNeighbors(pt, racemap[0].length, racemap.length);
    for (i in nbrs) {
        const nbr = nbrs[i];

        if (!ptsAreEqual(prevPt, nbr)) {
            const nextVal = racemap[nbr.x][nbr.y];
            if (nextVal === '.' || nextVal === 'E') return nbr;
        }
    }
    return null;
}

// Traverse unaltered racetrack and populate traversal
function traverse(racemap) {
    const traversal = new Map();
    const startPt = findStart(racemap);

    var prevPt = {x: null, y: null};
    var pt = startPt;
    var time = 0;

    do {
        traversal.set(JSON.stringify(pt), time);

        const nextPt = nextMove(racemap, pt, prevPt);

        prevPt = pt;
        pt = nextPt;
        time += 1;
    } while (pt);

    return traversal; 
}

// Given a racemap, traversal, and point, find cheats for that point
function findCheats(racemap, traversal, pt) {
    const cheats = []; 
    const firstMoves = getNeighbors(pt, racemap[0].length, racemap.length);

    for (i in firstMoves) {
        const firstMove = firstMoves[i];

        if (racemap[firstMove.x][firstMove.y] === '#') {
            const secondMoves = getNeighbors(firstMove, racemap[0].length, racemap.length);
            
            for (j in secondMoves) {
                const secondMove = secondMoves[j];

                if (racemap[secondMove.x][secondMove.y] === '.') {
                    const startTime = traversal.get(JSON.stringify(pt));
                    const endTime = traversal.get(JSON.stringify(secondMove));
                    
                    if (endTime > startTime) {
                        const cheat = {
                            start: pt,
                            end: secondMove
                        };

                        cheats.push(cheat);
                    }
                }
            }
        }
    }

    return cheats;
}

// Calculate time saved given a cheat and traversal

// Solve: 
// Find traversal
// For each point in traversal, find cheat for each point
// Calculate time for all cheats
// Pick top

const racemap = populateRacemap('test.txt');
const traversal = traverse(racemap);
const p = {x: 2, y: 9};
console.log(findCheats(racemap, traversal, p));
const b = {x: 0, y: 3};
// console.log(getNeighbors(b, 5, 5));