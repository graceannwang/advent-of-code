### Approach scratch paper
want to make more elegant brute force approach

genCoords iterator creates these sequences (start point of each segment):
rows: i range is [0 to l], j range is [0 to w-4]
cols: i range is [0 to l-4], j range is [0 to w]
\: i range is [0 to w-4], j range is [0 to l-4]
/: i range is [3 to w], j range is [0 to l-4]

readSegement has xIncr, yIncr:
rows: (x, y), (x, y+1)... (x, y+3) so xIncr = 0, yIncr = 1
cols: (x, y), (x+1, y)... (x+3, y) so xIncr = 1, yIncr = 0
\: (x, y), (x+1, y+1)... (x+3, y+3) so xIncr = 1, yIncr = 1
/: (x, y), (x-1, y-1)... (x-3, y-3) so xIncr = -1, yIncr = -1

solve(input):
    w = width of puzzle input
    l = length of puzzle input 
    total = 0

    repeate this for rows, cols, \, / (create object that stores data?)
    for (x, y) in genCoords((0, l), (0, w-4)):
        segment = readSegment((x, y), (0, 1))
        if regex matches segment with XMAS|SAMX then total += 1

### What I've learned
* Created my own iterator in JS


### Future exploration
* Generators