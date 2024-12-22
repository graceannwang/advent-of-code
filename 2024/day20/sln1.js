const { log } = require('node:console');
const { deflateRawSync } = require('node:zlib');

const CHEAT_EXPENSE = 2;

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
function findCheatsForPt(racemap, traversal, pt) {
    const cheats = []; 
    const firstMoves = getNeighbors(pt, racemap[0].length, racemap.length);

    for (i in firstMoves) {
        const firstMove = firstMoves[i];

        if (racemap[firstMove.x][firstMove.y] === '#') {
            const secondMoves = getNeighbors(firstMove, racemap[0].length, racemap.length);
            
            for (j in secondMoves) {
                const secondMove = secondMoves[j];

                if (racemap[secondMove.x][secondMove.y] === '.' ||
                    racemap[secondMove.x][secondMove.y] === 'E') {
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
function getTimeSaved(cheat, traversal) {
    const startTime = traversal.get(JSON.stringify(cheat.start));
    const endTime = traversal.get(JSON.stringify(cheat.end));

    return (endTime - startTime) - CHEAT_EXPENSE; 
}

function findAllCheats(racemap, traversal) {
    const cheats = new Map();

    const keys = traversal.keys();
    for (const key of keys) {
        const pt = JSON.parse(key);
        const ptCheats = findCheatsForPt(racemap, traversal, pt);

        for (i in ptCheats) {
            const cheat = ptCheats[i];
            const timeSaved = getTimeSaved(cheat, traversal);

            if (cheats.has(timeSaved)) {
                cheats.get(timeSaved).push(cheat);
            } else {
                cheats.set(timeSaved, [cheat]);
            }
        }
    }

    // Sort cheats based on frequency
    const sortedCheatsArr = Array.from(cheats).sort((a, b) => b[0] - a[0]);
    return new Map(sortedCheatsArr);
}

function getCheatsCounts(cheatsInfo) {
    const cheatsCounts = new Map();

    for (const cheatInfo of cheatsInfo) {
        cheatsCounts.set(cheatInfo[0], cheatInfo[1].length);
    }

    return cheatsCounts;
}

function logMapElements(value, key, map) {
    const valueStr = JSON.stringify(value);
    console.log(`m[${key}] = ${valueStr}\n`);
}

function logNumCheats(numCheats, secondsSaved, map) {
    console.log(`There are ${numCheats} cheats that save ${secondsSaved} picoseconds.`);
}

function solve(inputFilePath, timeThresh) {
    const racemap = populateRacemap(inputFilePath);
    const traversal = traverse(racemap);

    const cheatsInfo = findAllCheats(racemap, traversal);
    const cheatsCounts = getCheatsCounts(cheatsInfo);

    // console.log(cheatsCounts);
    var numTopCheats = 0;
    for (const cheatCount of cheatsCounts) {
        const timeSaved = cheatCount[0];
        const numCheats = cheatCount[1];

        if (timeSaved >= timeThresh) numTopCheats += numCheats;
    }
    
    console.log(`There are ${numTopCheats} cheats that save at least ${timeThresh} picoseconds:\n`);
    cheatsCounts.forEach(logNumCheats);
}

// solve('./test.txt', 40);
solve('./input.txt', 100);
