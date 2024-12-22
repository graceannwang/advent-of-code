
### Approach / Thoughts
The amount of time any cheat saves is the amount of time it takes to 
travel the part of the track which is skipped as a result of the cheat
(minus the amount of time it takes to go from the cheat's start position to the end position, 2). 
To determine this number, each dot can be numbered according to the number of 
picoseconds it takes to reach that dot. This simply requires traversing the track. 
To calculate amount of time saved, subtract the number associated with the start
point from the number associated with the end point. We can denote this number t. 
Each dot will have a t. 

In other words: 
Let T be a map between each dot (.) and the amount of time it takes to reach 
that dot starting from S. 

For any cheat (s, e), the amount of time saved by (s, e) = (T(e) - T(s)) + 2. 
Note that s must be the position before the first wall and e is the position at 
the 2nd second. 

The only piece missing here is some way to identify all possible cheats. 
Then, filter for and count the cheats that save at least 100 picoseconds. 

To identify all possible cheats, we traverse the original race track again. 
We consider the possible cheats at every single dot. At each dot, we consider
every direction. For each direction, here are our requirements:
* The 1st move in the cheat goes through a #. 
* The 2nd move lands on a dot. (Avoid segmentation fault)
* T(e) > T(s) 
[notice that we don't consider cheats that save 0 seconds to be cheats].

In other words, a cheat is a cheat insofar as it avoids disqualification
and can save you time. 

Helper functions to make: 
* function which creates map T (in: matrix, out: map between (s,e) and t)
* function which calculates all possible cheats for a dot (in: (matrix, dot), out: void). 
This function will save information to a global map where key is amount of time
saved and value is number of cheats. 