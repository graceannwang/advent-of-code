### What I learned
* I was trying to find ways read file input on my local machine using JS and
found this was not straightforward. And then I realized this is because JS was 
not built for this. JS is built to be run in the browser, or at least play some
role in managing communication between client and server. With this is mind, 
there are also security considerations if JS, when running on a client browser,
is able to just read file content based on path.
* So I want JS to run on my local laptop somehow. This is where Node.js comes 
in. Node.js was made so that you can run JS on a server. It does this by using
the JS engine used in Chrome's browser to interpret JS. The engine should come 
with its own callstack and memory heap.
* Node.js uses Libuv for I/O, exposes APIs for you to utilize this.
* Used nvm for installation, which is a useful library for managing different Node.js 
versions.
* The answer to how I can read local files is to use the `fs` module, supplied
by Node.js.
* Just a reminder to myself that character encodings are essentially just 
mappings between human-understandable characters and values that are then 
read by your computer. 


[Node.js History](https://www.freecodecamp.org/news/what-exactly-is-node-guide-for-beginners/)
* JS played an integral role in the popularity of the Chrome browser and thus
the internet as we know it today.
* Node.js is inextricably linked with Google as it uses V8.

### Things to explore in the future
* Node.js
* Promises
* How JS/Node.js does async programming 
(interesting because how does it do this if there is only a single thread?)
* Node.js module management and how this is different than in the browser 
(e.g. how module.exports works?)
* Deeper dive into `const` vs `let`, when to use which one, best practices etc.
