### To learn
* JS test frameworks
* truthy vs falsy

### Approaches
First thoughts: Define a 'viable' design to be any towel design that can 
be constructed from the given set of patterns, P. For any viable design, there 
can be many ways to construct it from P. We need to take into account these 
various paths to viability. 

1) Construct a recursive function f() which does the following: 

Given a desired design d and a set of available patterns P, for every
pattern p in P, identify whether p matches any substring s of d where  
s belongs to the beginning of d. Namely, s = d[0]...d[m] where m = len(s).

Let n = len(d). For every p which matches, store d[m+1]...d[n] in a list NEXT. 

Once all patterns in P are checked, return f(NEXT[0]) OR f(NEXT[1]) OR f(NEXT[2]) OR ...

2) Brute force. For every d, generate all possible sequence of patterns (this can be done recursively). 
If any sequence has patterns which are included in P then true. 

3) Brute force. Construct all possible designs given P. Check given designs against this set.